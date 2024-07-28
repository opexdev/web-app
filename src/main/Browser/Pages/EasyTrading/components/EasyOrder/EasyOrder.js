import React, {useEffect, useState} from 'react';
import classes from './EasyOrder.module.css'
import {Trans, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserAccount} from "../../../../../../queries/hooks/useGetUserAccount";
import {BN, parsePriceString} from "../../../../../../utils/utils";
import {useOrderBook} from "../../../../../../queries";
import {toast} from "react-hot-toast";
import {createOrder} from "js-api-client";
import {setLastTransaction} from "../../../../../../store/actions/auth";
import {images} from "../../../../../../assets/images";
import TextInput from "../../../../../../components/TextInput/TextInput";
import Icon from "../../../../../../components/Icon/Icon";
import NumberInput from "../../../../../../components/NumberInput/NumberInput";
import Button from "../../../../../../components/Button/Button";

const EasyOrder = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {data: userAccount} = useGetUserAccount()
    const [isLoading, setIsLoading] = useState(false)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const symbols = useSelector((state) => state.exchange.symbols)

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
        const availableAssets = [];
        for (const symbol of symbols) {
            if (!availableAssets.includes(symbol.baseAsset)) availableAssets.push(symbol.baseAsset)
            if (!availableAssets.includes(symbol.quoteAsset)) availableAssets.push(symbol.quoteAsset)
        }
        return availableAssets;
    }

    const handleAvailableDest = (buy) => {
        const dest = []
        for (const symbol of symbols) {
            if (symbol.baseAsset === buy) dest.push(symbol.quoteAsset)
            if (symbol.quoteAsset === buy) dest.push(symbol.baseAsset)
        }
        return dest
    }

    const findPair = (buy, sell) => symbols?.find(s => ((s?.baseAsset === buy) && (s?.quoteAsset === sell)) || ((s?.baseAsset === sell) && (s?.quoteAsset === buy)))

    const [selected, setSelected] = useState({
        buy: symbols[0].baseAsset,
        sell: symbols[0].quoteAsset,
        pair: findPair(symbols[0].baseAsset, symbols[0].quoteAsset),
        type: "ask"
    })

    const reversePair = () => {

        setSelected({
            ...selected,
            buy: selected?.sell,
            sell: selected?.buy,
            type: selected?.type ==="ask" ? "bid" : "ask"
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
        let range = "baseRange"
        if (selected.type === "bid") range = "quoteRange"
        if (reqAmount.isZero() && reqAmount.isLessThan(selected.pair[range].min)) {
            newAlert = <Trans
                i18nKey="orders.minOrder"
                values={{
                    min: selected.pair[range].min?.toString(),
                    currency: t("currency." + selected.buy),
                }}
            />
        }

        if (!reqAmount.mod(selected.pair[range].step).isZero()) {
            newAlert = <Trans
                i18nKey="orders.divisibility"
                values={{mod: selected.pair[range].step.toString()}}
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
        let range = "quoteRange"
        if (selected.type === "bid") range = "baseRange"

        if (totalPrice.isZero() && totalPrice.isLessThan(selected.pair[range].min)) {
            newAlert = <Trans
                i18nKey="orders.minOrder"
                values={{
                    min: selected.pair[range].min?.toString(),
                    currency: t("currency." + selected.sell),
                }}
            />

        }


        if (!totalPrice.mod(selected.pair[range].step).isZero()) {
            newAlert = <Trans
                i18nKey="orders.divisibility"
                values={{mod: selected.pair[range].step.toString()}}
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
        if (!reqAmount.mod(selected.pair?.[selected.type === "ask" ? "baseRange" : "quoteRange"].step).isZero()) {
            reqAmount = reqAmount.minus(reqAmount.mod(selected.pair?.[selected.type === "ask" ? "baseRange" : "quoteRange"].step));
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
            newOrder.reqAmount = order.totalPrice.decimalPlaces(selected.pair?.baseAssetPrecision)
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
                        base: t("currency." + selected.pair?.baseAsset),
                        quote: t("currency." + selected.pair?.quoteAsset),
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
        const sellOptions = handleAvailableDest(newBuy)

        setOptions({
            ...options,
            "sell": sellOptions,
        })
        const sell = sellOptions.includes(selected.sell) ? selected.sell : sellOptions[0];
        const pair = findPair(newBuy, sell)
        setSelected({
            buy: newBuy,
            sell,
            pair,
            type: newBuy === pair.baseAsset ? "ask" : "bid"
        })
        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        })
    }
    const sellOnChangeHandler = (e) => {
        const newSell = e.value;
        const pair = findPair(selected.buy, newSell)
        setSelected({
            ...selected,
            sell: newSell,
            pair,
            type: selected.buy === pair.baseAsset ? "ask" : "bid"
        })
        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        })
    }
    const showBestPrice = () => {
        if (order.pricePerUnit.isZero()) return 0
        if (selected.type === "ask") return order.pricePerUnit.toFormat()
        return new BN(1).dividedBy(order.pricePerUnit).decimalPlaces(selected.pair?.baseAssetPrecision).toFormat()
    }

    useEffect(() => {
        if (order.totalPrice.isGreaterThan(userAccount?.wallets[selected?.sell]?.free)) {
            return setAlert({
                ...alert,
                totalPrice: t('orders.notEnoughBalance')
            })
        }
        return setAlert({
            ...alert,
            totalPrice: null
        })
    }, [order.totalPrice])


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
                                         style={{backgroundImage: `url("${images[o]}")`}}
                                    />
                                    <span className={`mr-1`}>{t('currency.' + o)}</span>
                                </div>
                            }
                        }
                    )}
                    lead={t("buy")}
                    type="select"
                    value={{
                        value: selected?.buy,
                        label: t('currency.' + selected?.buy),
                    }}
                    onchange={buyOnChangeHandler}
                    customClass={`width-90 ${classes.thisInput} mb-1`}
                />

                <div className={`row width-80 jc-between fs-0-9`}>
                    <p>{t("MarketInfo.lastPrice")}{" "} {t("currency." + selected?.buy)}:</p>
                    <span>{showBestPrice()}{" "}{t("currency." + selected?.sell)}</span>
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
                                         style={{backgroundImage: `url("${images[o]}")`}}
                                    />
                                    <span className={`mr-1`}>{t('currency.' + o)}</span>
                                </div>
                            }
                        }
                    )}
                    lead={t("with")}
                    type="select"
                    value={{
                        value: selected?.sell,
                        label: selected?.sell ? t('currency.' + selected?.sell) : t("PersonalizationForm.placeholder"),
                    }}
                    onchange={sellOnChangeHandler}
                    customClass={`width-90 ${classes.thisInput} my-1`}
                />

                <div className={`row width-80 jc-between fs-0-9 cursor-pointer`}>
                    <p>{t("orders.availableAmount")}:{" "}</p>
                    <span
                        onClick={fillBuyByWallet}>{new BN(userAccount?.wallets[selected?.sell]?.free || 0).toFormat()}{" "}{t("currency." + selected?.sell)}</span>
                </div>

                <NumberInput
                    lead={t("orders.amount")}
                    after={t("currency." + selected.buy)}
                    value={order.reqAmount.toFormat()}
                    maxDecimal={selected.type === "ask" ? selected.pair?.baseAssetPrecision : selected.pair?.quoteAssetPrecision}
                    onchange={(e) => buyPriceHandler(e.target.value)}
                    alert={alert.reqAmount}
                    customClass={`width-90 mb-1 mt-5`}
                    isAllowed={isAllowed}
                />
                <NumberInput
                    lead={t("orders.totalPrice")}
                    value={order?.totalPrice?.toFormat(selected.type === "ask" ? selected.pair?.quoteAssetPrecision : selected.pair?.baseAssetPrecision)}
                    maxDecimal={selected.type === "ask" ? selected.pair?.quoteAssetPrecision : selected.pair?.baseAssetPrecision}
                    after={t("currency." + selected.sell)}
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
