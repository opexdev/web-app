import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import classes from "../../Order.module.css";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {BN, parsePriceString} from "../../../../../../../../../../../../utils/utils";
import NumberInput from "../../../../../../../../../../../../components/NumberInput/NumberInput";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {setLastTransaction} from "../../../../../../../../../../../../store/actions/auth";
import {images} from "../../../../../../../../../../../../assets/images";
import {useGetUserAccount} from "../../../../../../../../../../../../queries/hooks/useGetUserAccount";
import {createOrder} from "js-api-client";

const SellOrder = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const tradeFee = useSelector((state) => state.auth.tradeFee)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const activePair = useSelector((state) => state.exchange.activePair)
    const bestSellPrice = useSelector((state) => state.exchange.activePairOrders.bestSellPrice)
    const selectedSellOrder = useSelector((state) => state.exchange.activePairOrders.selectedSellOrder)

    const {data: userAccount} = useGetUserAccount()
    const base = userAccount?.wallets[activePair.baseAsset]?.free || 0;

    const [alert, setAlert] = useState({
        reqAmount: null,
        submit: false,
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

    useEffect(() => {
        if (alert.submit) {
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
    }, [activePair])
    const isAllowed = ({floatValue}) => {
        return floatValue < 10 ** 12;
    }

    const currencyValidator = (key, val, rule) => {
        if (!val.isZero() && val.isLessThan(rule.min)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: activePair.baseRange.min.toString(),
                            currency: t("currency." + activePair.baseAsset),
                        }}
                    />
                ),
            });
        }
        if (val.isGreaterThan(rule.max)) {
            return setAlert({
                ...alert,
                [key]:
                    (<Trans
                        i18nKey="orders.maxOrder"
                        values={{
                            max: activePair.baseRange.max.toLocaleString(),
                            currency: t("currency." + activePair.baseAsset),
                        }}
                    />)
            })
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

    const sellPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = new BN(value);
                currencyValidator("reqAmount", reqAmount, activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order.pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: reqAmount.multipliedBy(order.pricePerUnit).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.quoteAssetPrecision),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: pricePerUnit.multipliedBy(order.reqAmount).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.quoteAssetPrecision),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(activePair.baseAssetPrecision);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.quoteAssetPrecision) : new BN(0),
                });
                currencyValidator("reqAmount", req, activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        }));
    }, [tradeFee]);

    useEffect(() => {
        sellPriceHandler(
            bestSellPrice.toString(),
            "pricePerUnit",
        );
    }, [order.stopMarket]);

    useEffect(() => {
        const reqAmount = new BN(selectedSellOrder.amount);
        const pricePerUnit = new BN(selectedSellOrder.pricePerUnit);
        setOrder({
            ...order,
            reqAmount,
            pricePerUnit: pricePerUnit,
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedSellOrder]);

    const fillSellByWallet = () => {
        if (order.pricePerUnit.isEqualTo(0) && bestSellPrice === 0) return toast.error(t("orders.hasNoOffer"));
        if (order.pricePerUnit.isEqualTo(0)) {
            const reqAmount = new BN(base).decimalPlaces(activePair.baseAssetPrecision);
            const pricePerUnit = new BN(bestSellPrice);
            setOrder({
                ...order,
                reqAmount: reqAmount,
                pricePerUnit: pricePerUnit,
                totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                tradeFee: reqAmount.multipliedBy(pricePerUnit).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
            });
        } else {
            sellPriceHandler(
                base.toString(),
                "reqAmount",
            );
        }
    };

    const fillSellByBestPrice = () => {
        sellPriceHandler(
            bestSellPrice.toString(),
            "pricePerUnit",
        );
    };

    useEffect(() => {
        if (order.reqAmount.isGreaterThan(base)) {
            return setAlert({
                ...alert,
                reqAmount: t('orders.notEnoughBalance')
            })
        }
        if (alert.reqAmount === t('orders.notEnoughBalance')) {
            return setAlert({
                ...alert,
                reqAmount: null
            })
        }
    }, [order.reqAmount]);

    const submit = () => {
        if (!isLogin) return false

        if (isLoading) return false

        setIsLoading(true)
        createOrder(activePair.symbol, "SELL", order)
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
                        base: t("currency." + activePair.baseAsset),
                        quote: t("currency." + activePair.quoteAsset),
                        type: t("sell"),
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

        if (isLogin) return t("sell")

        return t("pleaseLogin")
    }

    return (
        <div className={`column jc-between ${classes.content}`}>
            <div className="column jc-center">
                <p onClick={() => fillSellByWallet()}>{t("orders.availableAmount")}:{" "}
                    <span
                        className="cursor-pointer">{new BN(base).toFormat()}{" "}{t("currency." + activePair.baseAsset)}</span>
                </p>
                <p onClick={() => fillSellByBestPrice()}>
                    {t("orders.bestOffer")}:{" "}
                    <span className="cursor-pointer">
                        {new BN(bestSellPrice).toFormat()}{" "}{t("currency." + activePair.quoteAsset)}
                    </span>
                </p>
            </div>
            {/*
            <div className="row ai-center">
                <span className="pl-05">{t("orders.stopLimit")}</span>
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={order.stopLimit}
                    onChange={(e) => setOrder({...order, stopLimit: e.target.checked})}
                />
            </div>
            {order.stopLimit ? (
                <NumberInput
                    lead={t("orders.stopPrice")}
                    after={t("currency." + props.activePair.baseAsset)}
                    value={order.stopPrice}
                    maxDecimal={props.activePair.baseAssetPrecision}
                    onchange={(value) =>
                        setOrder({...order, stopPrice: value.floatValue})
                    }
                />
            ) : (
                ""
            )}*/}

            <NumberInput
                lead={t("orders.amount")}
                after={t("currency." + activePair.baseAsset)}
                value={order.reqAmount.toFormat()}
                maxDecimal={activePair.baseAssetPrecision}
                onchange={(e) => sellPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
                isAllowed={isAllowed}
            />

            {order.stopMarket ? (
                <NumberInput
                    customClass={classes.stopMarket}
                    lead={t("orders.pricePerUnit")}
                    prefix="~"
                    after={t("currency." + activePair.quoteAsset)}
                    value={order.pricePerUnit.toFormat()}
                    maxDecimal={activePair.quoteAssetPrecision}
                    onchange={(e) => sellPriceHandler(e.target.value, "pricePerUnit")}
                    isAllowed={isAllowed}
                />
            ) : (
                <NumberInput
                    lead={t("orders.pricePerUnit")}
                    after={t("currency." + activePair.quoteAsset)}
                    value={order.pricePerUnit.toFormat()}
                    maxDecimal={activePair.quoteAssetPrecision}
                    onchange={(e) => sellPriceHandler(e.target.value, "pricePerUnit")}
                    isAllowed={isAllowed}
                />
            )}

            <div className="row ai-center">
                <span className="pl-05">{t("orders.marketSellPrice")}</span>
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={order.stopMarket}
                    onChange={(e) => setOrder({...order, stopMarket: e.target.checked})}
                />
            </div>

            <NumberInput
                lead={t("orders.totalPrice")}
                value={order.totalPrice.toFormat()}
                maxDecimal={activePair.quoteAssetPrecision}
                after={t("currency." + activePair.quoteAsset)}
                onchange={(e) => sellPriceHandler(e.target.value, "totalPrice")}
                isAllowed
            />

            <div className="column jc-center">
                <p>
                    {t("orders.tradeFee")}:{" "}
                    {order.tradeFee.toFormat()}{" "}
                    {t("currency." + activePair.quoteAsset)}
                </p>
                <p>
                    {t("orders.getAmount")}:{" "}
                    {order.totalPrice.minus(order.tradeFee).decimalPlaces(activePair.quoteAssetPrecision).toFormat()}{" "}
                    {t("currency." + activePair.quoteAsset)}
                </p>
            </div>
            <Button
                buttonClass={`${classes.thisButton} ${classes.sellOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                type="submit"
                onClick={submit}
                disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin}
                buttonTitle={submitButtonTextHandler()}
            />
        </div>
    );
};

export default SellOrder;
