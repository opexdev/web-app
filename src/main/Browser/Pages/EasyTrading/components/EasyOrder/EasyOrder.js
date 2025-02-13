import React, {useEffect, useState} from 'react';
import classes from './EasyOrder.module.css'
import {Trans, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserAccount} from "../../../../../../queries/hooks/useGetUserAccount";
import {BN, getCurrencyNameOrAlias, parsePriceString} from "../../../../../../utils/utils";
import {useOrderBook} from "../../../../../../queries";
import {toast} from "react-hot-toast";
import {createOrder} from "js-api-client";
import {setLastTransaction} from "../../../../../../store/actions/auth";
import {images} from "../../../../../../assets/images";
import TextInput from "../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../components/Icon/Icon";
import NumberInput from "../../../../../../components/NumberInput/NumberInput";
import Button from "../../../../../../components/Button/Button";
import i18n from "i18next";

const EasyOrder = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data: userAccount} = useGetUserAccount()
    const [isLoading, setIsLoading] = useState(false)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)
    const pairsList = useSelector((state) => state.exchange.pairsList)

    const [alert, setAlert] = useState({
        submit: false,
        reqAmount: null,
        totalPrice: null,
    });

    const [order, setOrder] = useState({
        tradeFee: new BN(0),
        stopLimit: false,
        stopMarket: false,
        stopPrice: new BN(0),
        reqAmount: new BN(0),
        pricePerUnit: new BN(0),
        totalPrice: new BN(0),
    });

    const handleAvailableAssets = () => {
        const availableAssets = new Set();
        Object.values(pairsList).forEach(pair => {
            availableAssets.add(pair.baseAsset);
            availableAssets.add(pair.quoteAsset);
        });
        return Array.from(availableAssets);
    };

    const handleAvailableDest = (buy) => {
        const dest = new Set();
        Object.values(pairsList).forEach(pair => {
            if (pair.baseAsset === buy) dest.add(pair.quoteAsset);
            if (pair.quoteAsset === buy) dest.add(pair.baseAsset);
        });
        return Array.from(dest);
    };


    const findPair = (buy, sell) =>
        Object.values(pairsList)?.find(pair =>
            (pair.baseAsset === buy && pair.quoteAsset === sell) ||
            (pair.baseAsset === sell && pair.quoteAsset === buy)
        );

    const pairsArray = Object.values(pairsList);

    const [selected, setSelected] = useState({
        buy: pairsArray[0]?.baseAsset,
        sell: pairsArray[0]?.quoteAsset,
        pair: findPair(pairsArray[0]?.baseAsset, pairsArray[0]?.quoteAsset),
        type: "ask"
    });

    const reversePair = () => {

        setSelected({
            ...selected,
            buy: selected?.sell,
            sell: selected?.buy,
            type: selected?.type ==="ask" ? "bid" : "ask"
        })

        setAlert({
            submit: false,
            reqAmount: null,
            totalPrice: null,
        })

    }

    const [options, setOptions] = useState({
            buy: handleAvailableAssets(),
            sell: handleAvailableDest(handleAvailableAssets()[0]),
        }
    )

    const {data: orderBook} = useOrderBook(selected.pair.symbol)

    const bestPriceHandler = () => {
        let bestPrice = 0;
        if (orderBook && selected.type === "ask" && orderBook["asks"].length) {
            bestPrice = orderBook["asks"][0][0]
        }
        if (orderBook && selected.type === "bid" && orderBook["bids"].length) {
            bestPrice = orderBook["bids"][0][0];
        }
        setOrder({
            ...order,
            pricePerUnit: new BN(bestPrice)
        })
    }

    useEffect(() => {
        bestPriceHandler()
    }, [orderBook, selected])


    const buyPriceHandler = (value) => {
        let newAlert = null
        value = parsePriceString(value);
        const reqAmount = new BN(value);

        let selectedCurrency = "baseAsset"
        if (selected.type === "bid") selectedCurrency = "quoteAsset"

        if (reqAmount.isZero() && reqAmount.isLessThan(currencies[selected.pair[selectedCurrency]].minOrder)) {
            newAlert = <Trans
                i18nKey="orders.minOrder"
                values={{
                    min: new BN( currencies[selected.pair[selectedCurrency]].minOrder).toFormat(),
                    currency: getCurrencyNameOrAlias(currencies[selected?.buy], language),
                }}
            />
        }

        if (!reqAmount.mod(currencies[selected.pair[selectedCurrency]].step).isZero()) {
            newAlert = <Trans
                i18nKey="orders.divisibility"
                values={{mod: new BN(currencies[selected.pair[selectedCurrency]].step).toFormat()}}
            />
        }
        setAlert({...alert, reqAmount: newAlert});

        const price = selected.type === "ask" ? reqAmount.multipliedBy(order.pricePerUnit) : reqAmount.multipliedBy(order.pricePerUnit.pow(-1));
        setOrder({
            ...order,
            reqAmount,
            totalPrice: price,
        });

    };

    const totalPriceHandler = (value) => {
        let newAlert = null
        value = parsePriceString(value);
        const totalPrice = new BN(value);

        let selectedCurrency = "quoteAsset"
        if (selected.type === "bid") selectedCurrency = "baseAsset"

        if (totalPrice.isZero() && totalPrice.isLessThan(currencies[selected.pair[selectedCurrency]].minOrder)) {
            newAlert = <Trans
                i18nKey="orders.minOrder"
                values={{
                    min: new BN(currencies[selected.pair[selectedCurrency]].minOrder).toFormat(),
                    currency: getCurrencyNameOrAlias(currencies[selected.sell], language),
                }}
            />

        }

        if (!totalPrice.mod(currencies[selected.pair[selectedCurrency]].step).isZero()) {
            newAlert = <Trans
                i18nKey="orders.divisibility"
                values={{mod: new BN(currencies[selected.pair[selectedCurrency]].minOrder).toFormat()}}
            />
        }
        setAlert({...alert, totalPrice: newAlert});

        const reqAmount = selected.type === "ask" ? totalPrice.dividedBy(order.pricePerUnit) : totalPrice.dividedBy(order.pricePerUnit.pow(-1));
        setOrder({
            ...order,
            totalPrice: totalPrice,
            reqAmount
        });
    };

    const fillBuyByWallet = () => {
        if (order.pricePerUnit.isEqualTo(0)) return toast.error(t("orders.hasNoOffer"));
        let totalPrice = new BN(userAccount?.wallets[selected?.sell]?.free);
        let reqAmount = totalPrice.dividedBy(order.pricePerUnit)
        if (!reqAmount.mod(currencies[selected.pair?.[selected.type === "ask" ? "baseAsset" : "quoteAsset"]].step).isZero()) {
            reqAmount = reqAmount.minus(reqAmount.mod(currencies[selected.pair?.[selected.type === "ask" ? "baseAsset" : "quoteAsset"]].step));
        }
        buyPriceHandler(
            reqAmount.toFormat(),
            "reqAmount",
        );

    };

    const submit = () => {
        if (!isLogin) return
        if (isLoading) return

        setIsLoading(true)
        const newOrder = {...order}
        if (selected.type === "bid") {
            newOrder.reqAmount = order.totalPrice.decimalPlaces(currencies[selected?.pair?.baseAsset].precision)
        }
        createOrder(selected.pair?.symbol, selected.type === "ask" ? "BUY" : "SELL", newOrder)
            .then((res) => {
                setOrder({
                    tradeFee: new BN(0),
                    stopLimit: false,
                    stopMarket: false,
                    stopPrice: new BN(0),
                    reqAmount: new BN(0),
                    pricePerUnit: new BN(0),
                    totalPrice: new BN(0),
                })
                toast.success(<Trans
                    i18nKey="orders.success"
                    values={{
                        base: getCurrencyNameOrAlias(selected?.pair?.baseAsset, language),
                        quote: getCurrencyNameOrAlias(selected?.pair?.quoteAsset, language),
                        type: t("buy"),
                        reqAmount: order.reqAmount,
                        pricePerUnit: order.pricePerUnit,
                    }}
                />);
                dispatch(setLastTransaction(res.data.transactTime))
            }).catch(() => {
            toast.error(t("orders.error"));
            setAlert({
                ...alert, submit: true
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoading} alt="linearLoading"/>
        if (isLogin) return t("convert")
        return t("pleaseLogin")
    }


    const isAllowed = ({floatValue}) => {
        return floatValue < 10 ** 12;
    }

    const buyOnChangeHandler = (e) => {
        const newBuy = e.value;
        const sellOptions = handleAvailableDest(newBuy);

        setOptions(prevOptions => ({
            ...prevOptions,
            sell: sellOptions,
        }));

        const sell = sellOptions.includes(selected.sell) ? selected.sell : sellOptions[0];
        const pair = findPair(newBuy, sell) || {};
        setSelected({
            buy: newBuy,
            sell,
            pair,
            type: pair.baseAsset === newBuy ? "ask" : "bid"
        });

        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        });

        setAlert({
            submit: false,
            reqAmount: null,
            totalPrice: null,
        });
    };

    const sellOnChangeHandler = (e) => {
        const newSell = e.value;
        const pair = findPair(selected.buy, newSell) || {};

        setSelected(prevSelected => ({
            ...prevSelected,
            sell: newSell,
            pair,
            type: selected.buy === pair.baseAsset ? "ask" : "bid"
        }));

        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        });

        setAlert({
            submit: false,
            reqAmount: null,
            totalPrice: null,
        });
    };
    const showBestPrice = () => {
        if (order.pricePerUnit.isZero()) return 0
        if (selected.type === "ask") return order.pricePerUnit.toFormat()
        return new BN(1).dividedBy(order.pricePerUnit).decimalPlaces(currencies[selected?.pair?.baseAsset].precision).toFormat()
    }

    return (
        <div className={`container card-bg card-border ${classes.container} width-30 column jc-start ai-center`}>

            <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-3 width-100 fs-02`}>
                <span>{t("MarketTitle.easyTrading")}</span>
            </div>

            <div className={`width-100 column jc-between ai-center py-2 ${classes.content}`} >
                <TextInput
                    select={true}
                    placeholder={t('TransactionHistory.coin')}
                    options={options?.buy.map((o) => {
                            return {
                                value: o,
                                label: <div className={`row jc-start ai-center`}>
                                    <div className={`${classes.avatar}`}
                                         /*style={{backgroundImage: `url("${images[o]}")`}}*/
                                         style={{ backgroundImage: `url("${currencies[o]?.icon}")` }}
                                    />
                                    <span className={`mr-1`}>{getCurrencyNameOrAlias(currencies[o], language)}</span>
                                </div>
                            }
                        }
                    )}
                    lead={t("buy")}
                    type="select"
                    value={{
                        value: selected?.buy,
                        label: getCurrencyNameOrAlias(currencies[selected?.buy], language),
                    }}
                    onchange={buyOnChangeHandler}
                    customClass={`width-90 ${classes.thisInput} mb-1`}
                />

                <div className={`row width-80 jc-between fs-0-9`}>
                    <p>{t("MarketInfo.lastPrice")}{" "} {getCurrencyNameOrAlias(currencies[selected?.buy], language)}:</p>
                    <span>{showBestPrice()}{" "}{ getCurrencyNameOrAlias(currencies[selected?.sell], language)}</span>
                </div>

                <div className={`width-86 flex jc-center ai-center my-3`}>
                    <Icon
                        iconName="icon-exchange-arrow flex fs-04"
                        customClass={`cursor-pointer hover-text`}
                        onClick={()=>reversePair()}
                    />
                </div>

                <TextInput
                    select={true}
                    placeholder={t('TransactionHistory.coin')}
                    options={options?.sell.map((o) => {
                            return {
                                value: o,
                                label: <div className={`row jc-start ai-center`}>

                                    <div className={`${classes.avatar}`}
                                         style={{ backgroundImage: `url("${currencies[o]?.icon}")` }}
                                    />
                                    <span className={`mr-1`}>{getCurrencyNameOrAlias(currencies[o], language)}</span>
                                </div>
                            }
                        }
                    )}
                    lead={t("with")}
                    type="select"
                    value={{
                        value: selected?.sell,
                        label: selected?.sell ?  getCurrencyNameOrAlias(currencies[selected?.sell], language) : t("PersonalizationForm.placeholder"),
                    }}
                    onchange={sellOnChangeHandler}
                    customClass={`width-90 ${classes.thisInput} my-1`}
                />

                <div className={`row width-80 jc-between fs-0-9 cursor-pointer`}>
                    <p>{t("orders.availableAmount")}:{" "}</p>
                    <span
                        onClick={fillBuyByWallet}>{new BN(userAccount?.wallets[selected?.sell]?.free || 0).decimalPlaces(currencies[selected?.sell]?.precision ?? 0).toFormat()}{" "}{getCurrencyNameOrAlias(currencies[selected?.sell], language)}</span>
                </div>

                <NumberInput
                    lead={t("orders.amount")}
                    after={getCurrencyNameOrAlias(currencies[selected?.buy], language)}
                    value={order.reqAmount.toFormat()}
                    maxDecimal={selected.type === "ask" ? currencies[selected?.pair?.baseAsset].precision : currencies[selected?.pair?.quoteAsset].precision}
                    onchange={(e) => buyPriceHandler(e.target.value)}
                    alert={alert.reqAmount}
                    customClass={`width-90 mb-1 mt-5`}
                    isAllowed={isAllowed}
                />

                <NumberInput
                    lead={t("orders.totalPrice")}
                    value={order?.totalPrice?.toFormat(selected.type === "ask" ? selected.pair?.quoteAssetPrecision : selected.pair?.baseAssetPrecision)}
                    maxDecimal={selected.type === "ask" ? currencies[selected?.pair?.quoteAsset].precision : currencies[selected?.pair?.baseAsset].precision}
                    after={getCurrencyNameOrAlias(currencies[selected?.sell], language)}
                    onchange={(e) => totalPriceHandler(e.target.value)}
                    alert={alert.totalPrice}
                    customClass={`width-90 my-1`}
                    isAllowed={isAllowed}
                />

                <Button
                    buttonClass={`${classes.thisButton} ${classes.buyOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center mt-4`}
                    type="submit"
                    onClick={submit}
                    disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin || alert.totalPrice}
                    buttonTitle={submitButtonTextHandler()}
                />
            </div>
        </div>
    );
};

export default EasyOrder;
