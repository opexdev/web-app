import React, {useEffect, useState} from 'react';
import classes from '../../EasyOrder.module.css';
import {Trans, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {BN, parsePriceString} from "../../../../../../../../utils/utils";
import {toast} from "react-hot-toast";
import {useOrderBook} from "../../../../../../../../queries";
import TextInput from "../../../../../../../../components/TextInput/TextInput";
import NumberInput from "../../../../../../../../components/NumberInput/NumberInput";
import {createOrder} from "js-api-client";
import {setLastTransaction} from "../../../../../../../../store/actions/auth";
import {images} from "../../../../../../../../assets/images";
import Button from "../../../../../../../../components/Button/Button";

const EasyBuyOrder = ({setOutPutSelected}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const symbols = useSelector((state) => state.exchange.symbols)

    const {data: userAccount} = useGetUserAccount()
    const [isLoading, setIsLoading] = useState(false)

    const tradeFee = useSelector((state) => state.auth.tradeFee)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const [pairConfig, setPairConfig] = useState({
        "baseAssetPrecision": 0,
        "quoteAssetPrecision": 0,
    })

    const [bestBuyPrice, setBestBuyPrice] = useState(new BN(0))

    const [selected, setSelected] = useState({
        "base": null,
        "quote": null,
    })
    const [options, setOptions] = useState({
        "base": [],
        "quote": [],
    })

    useEffect(() => {
        setOutPutSelected({
            "base": selected?.base,
            "quote": selected?.quote,
        })
    }, [selected]);

    const {data} = useOrderBook(selected?.base + selected?.quote)

    useEffect(() => {
        if (data?.asks?.length > 0 ) {
            setBestBuyPrice(new BN (data?.asks[0][0]))
        }

    }, [data]);

    const quote = userAccount?.wallets[selected?.quote]?.free || 0;

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

    const currentSymbolHandler = (base , quote) => {
        const currentSymbol = symbols?.find(s => (s?.baseAsset === base) && (s?.quoteAsset === quote))
        setPairConfig(currentSymbol)
    }

    const availableQuote = (baseAsset) => {

        const quoteAssets = [];
        for (const symbol of symbols) {
            if(symbol.baseAsset === baseAsset){
                quoteAssets.push(symbol.quoteAsset)
            }
        }
        return quoteAssets
    }

    useEffect(() => {
        const baseAssets = [];
        for (const symbol of symbols) {
            if (symbol.symbol.toUpperCase().includes("NLN")) continue
            if (!baseAssets.includes(symbol.baseAsset)) {
                baseAssets.push(symbol.baseAsset)
            }
        }
        const quoteOptions = availableQuote(baseAssets[0])
        setOptions({
            "base": baseAssets,
            "quote": quoteOptions,
        })
        setSelected({
            "base": baseAssets[0],
            "quote": quoteOptions[0],
        })
        currentSymbolHandler(baseAssets[0],quoteOptions[0])
    }, []);

    useEffect(() => {
        if (alert?.submit) {
            setAlert({
                ...alert, submit: false
            })
        }
    }, [order])

    useEffect(() => {
        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        })
        setAlert({
            submit: false,
            reqAmount: null,
            totalPrice: null,
        })
    }, [selected])

    const currencyValidator = (key, val, rule) => {
        if (!val.isZero() && val.isLessThan(rule.min)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: pairConfig?.baseRange?.min?.toString(),
                            currency: t("currency." + pairConfig?.baseAsset),
                        }}
                    />
                ),
            });
        }
        if (val.isGreaterThan(rule.max)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.maxOrder"
                        values={{
                            max: pairConfig?.baseRange?.max?.toLocaleString(),
                            currency: t("currency." + pairConfig?.baseAsset),
                        }}
                    />
                ),
            });
        }
        if (!val.mod(rule.step).isZero()) {
            return setAlert({
                ...alert,
                [key]: (<Trans
                    i18nKey="orders.divisibility"
                    values={{mod: rule.step.toString()}}
                />)
            })
        }
        return setAlert({...alert, [key]: null});
    };

    const buyPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = new BN(value);
                currencyValidator("reqAmount", reqAmount, pairConfig?.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order?.pricePerUnit).decimalPlaces(pairConfig?.quoteAssetPrecision),
                    tradeFee: reqAmount.multipliedBy(tradeFee[pairConfig?.quoteAsset]).decimalPlaces(pairConfig?.baseAssetPrecision),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(pairConfig?.quoteAssetPrecision),
                    tradeFee: order.reqAmount.multipliedBy(tradeFee[pairConfig?.quoteAsset]).decimalPlaces(pairConfig?.baseAssetPrecision),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(pairConfig?.baseAssetPrecision);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? req.multipliedBy(tradeFee[pairConfig?.quoteAsset]).decimalPlaces(pairConfig?.baseAssetPrecision) : new BN(0),
                });
                currencyValidator("reqAmount", req, pairConfig?.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        if (order.totalPrice.isGreaterThan(quote)) {
            return setAlert({
                ...alert,
                totalPrice: t('orders.notEnoughBalance')
            })
        }
        return setAlert({
            ...alert,
            totalPrice: null
        })
    }, [order.totalPrice]);

    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[pairConfig?.quoteAsset]).decimalPlaces(pairConfig?.baseAssetPrecision),
        }));
    }, [tradeFee]);

    const fillBuyByWallet = () => {
        if (bestBuyPrice.isEqualTo(0)) return toast.error(t("orders.hasNoOffer"));
        if (order.pricePerUnit.isEqualTo(0)) {
            const pricePerUnit = new BN(bestBuyPrice)
            let totalPrice = new BN(quote);
            let reqAmount = totalPrice.dividedBy(pricePerUnit).decimalPlaces(pairConfig?.baseAssetPrecision)
            if (!reqAmount.mod(pairConfig?.baseRange.step).isZero()) {
                reqAmount = reqAmount?.minus(reqAmount.mod(pairConfig?.baseRange.step));
                totalPrice = reqAmount.multipliedBy(pricePerUnit);
            }
            setOrder({
                ...order,
                reqAmount,
                pricePerUnit,
                totalPrice,
                tradeFee: reqAmount.multipliedBy(tradeFee[pairConfig?.quoteAsset]).decimalPlaces(pairConfig?.baseAssetPrecision),
            });
        } else {
            let totalPrice = new BN(quote);
            let reqAmount = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(pairConfig?.baseAssetPrecision)
            if (!reqAmount.mod(pairConfig?.baseRange.step).isZero()) {
                reqAmount = reqAmount?.minus(reqAmount.mod(pairConfig?.baseRange.step));
            }
            buyPriceHandler(
                reqAmount.toFormat(),
                "reqAmount",
            );
        }
    };

    const fillBuyByBestPrice = () => {
        buyPriceHandler(
            bestBuyPrice?.toString(),
            "pricePerUnit",
        );
    };

    useEffect(() => {
        fillBuyByBestPrice()
    }, [bestBuyPrice]);


    const submit = () => {
        if (!isLogin) {
            return false
        }
        if (isLoading) {
            return false
        }
        setIsLoading(true)
        createOrder(pairConfig?.symbol, "BUY", order)
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
                        base: t("currency." + pairConfig?.baseAsset),
                        quote: t("currency." + pairConfig?.quoteAsset),
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

        if (isLogin) return t("buy")

        return t("pleaseLogin")
    }

    const isAllowed = ({floatValue}) => {
        return floatValue < 10 ** 12;
    }

    const baseOnChangeHandler = (e) => {
        const newBase = e.value;
        const quoteOptions = availableQuote(newBase)

        currentSymbolHandler(newBase, quoteOptions.includes(selected.quote) ? selected.quote : quoteOptions[0])

        setOptions({
            ...options,
            "quote": quoteOptions,
        })
        setSelected({
            base: newBase,
            "quote": quoteOptions.includes(selected.quote) ? selected.quote : quoteOptions[0],
        })
    }


    return (
        <div className={`height-100 column jc-between ai-center py-2`}>
            <TextInput
                select={true}
                placeholder={t('TransactionHistory.coin')}
                options={options?.base.map((o)=>{return {
                    value: o,
                    label: <div className={`row jc-start ai-center`}>

                        <div className={`${classes.avatar}`}
                             style={{backgroundImage: `url("${images[o] }")`}}
                        />
                        <span className={`mr-1`}>{t('currency.'+ o)}</span>
                    </div>
                    }}
                )}
                lead={t("buy")}
                type="select"
                value={{
                    value: selected?.base,
                    label:  t('currency.'+ selected?.base),
                }}
                onchange={baseOnChangeHandler}
                customClass={`width-90 ${classes.thisInput} mb-1`}
            />

            <div className={`row width-80 jc-between fs-0-9`}>
                <p>{t("MarketInfo.lastPrice")}:{" "}</p>
                <span>{new BN(bestBuyPrice).toFormat()}{" "}{t("currency." + pairConfig?.quoteAsset)}</span>
            </div>

            <TextInput
                select={true}
                placeholder={t('TransactionHistory.coin')}
                options={options?.quote.map((o)=>{return { value: o,
                    label: <div className={`row jc-start ai-center`}>

                        <div className={`${classes.avatar}`}
                             style={{backgroundImage: `url("${images[o] }")`}}
                        />
                        <span className={`mr-1`}>{t('currency.'+ o)}</span>
                    </div>
                    }}
                )}
                lead={t("with")}
                type="select"
                value={{
                    value: selected?.quote,
                    label:  selected?.quote ? t('currency.'+ selected?.quote) : t("PersonalizationForm.placeholder"),
                }}
                onchange={(e) => setSelected({...selected, quote: e.value})}
                customClass={`width-90 ${classes.thisInput} my-1`}
            />

            <div className={`row width-80 jc-between fs-0-9 cursor-pointer`} onClick={() => {fillBuyByWallet()}}>
                <p>{t("orders.availableAmount")}:{" "}</p>
                <span>{new BN(quote).toFormat()}{" "}{t("currency." + pairConfig?.quoteAsset)}</span>
            </div>

            <span className={`my-2`}/>

            <NumberInput
                lead={t("orders.amount")}
                after={t("currency." + selected.base)}
                value={order.reqAmount.toFormat()}
                maxDecimal={pairConfig?.baseAssetPrecision}
                onchange={(e) => buyPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
                customClass={`width-90 my-1`}
                isAllowed={isAllowed}
            />

            <NumberInput
                lead={t("orders.totalPrice")}
                value={order?.totalPrice?.toFormat()}
                maxDecimal={pairConfig?.quoteAssetPrecision}
                after={t("currency." + selected.quote)}
                onchange={(e) => buyPriceHandler(e.target.value, "totalPrice")}
                alert={alert.totalPrice}
                customClass={`width-90 my-1`}
                isAllowed={isAllowed}
            />

            <div className="width-80 column jc-start fs-0-9 my-2">
                <p>
                    {t("orders.tradeFee")}:{" "}
                    {order?.tradeFee?.toFormat()}{" "}
                    {t("currency." + selected.base)}
                </p>
                <p>
                    {t("orders.getAmount")}:{" "}
                    {order?.reqAmount?.minus(order?.tradeFee).decimalPlaces(pairConfig?.baseAssetPrecision).toFormat()}{" "}
                    {t("currency." + selected.base)}
                </p>
            </div>

            <Button
                buttonClass={`${classes.thisButton} ${classes.buyOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                type="submit"
                onClick={submit}
                disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin || alert.totalPrice}
                buttonTitle={submitButtonTextHandler()}
            />
        </div>
    );
};

export default EasyBuyOrder;
