import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {createOrder} from "../../api/order";
import classes from "../../Order.module.css";
import React, {useEffect, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {Login as LoginRoute} from "../../../../../../../../../../routes/routes";
import {useHistory} from "react-router-dom";
import {BN, parsePriceString} from "../../../../../../../../../../utils/utils";
import NumberInput from "../../../../../../../../../../components/NumberInput/NumberInput";
import Button from "../../../../../../../../../../components/Button/Button";
import {setLastTransaction} from "../../../../../../../../../../store/actions/auth";
import {images} from "../../../../../../../../../../assets/images";

const BuyOrder = () => {

    const history = useHistory();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const activePair = useSelector((state) => state.exchange.activePair)
    const quote = useSelector((state) => state.auth.wallets[activePair.quoteAsset].free)
    const bestBuyPrice = useSelector((state) => state.exchange.activePairOrders.bestBuyPrice)

    const selectedBuyOrder = useSelector((state) => state.exchange.activePairOrders.selectedBuyOrder)
    const tradeFee = useSelector((state) => state.auth.tradeFee)
    const isLogin = useSelector((state) => state.auth.isLogin)

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


    const currencyValidator = (key, val, rule) => {
        if (!val.isZero() && val.isLessThan(rule.min)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: activePair.baseRange.min,
                            currency: t("currency." + activePair.baseAsset),
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
                            max: activePair.baseRange.max,
                            currency: t("currency." + activePair.baseAsset),
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
                    values={{mod:rule.step.toString()}}
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
                currencyValidator("reqAmount", reqAmount, activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order.pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: order.reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(activePair.baseAssetPrecision);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? req.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision) : new BN(0),
                });
                currencyValidator("reqAmount", req, activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        if(order.totalPrice.isGreaterThan(quote)){
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
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        }));
    }, [tradeFee]);

    useEffect(() => {
        buyPriceHandler(
            bestBuyPrice.toString(),
            "pricePerUnit",
        );
    }, [order.stopMarket]);

    useEffect(() => {
        const reqAmount = new BN(selectedBuyOrder.amount);
        const pricePerUnit = new BN(selectedBuyOrder.pricePerUnit);
        setOrder({
            ...order,
            reqAmount,
            pricePerUnit: pricePerUnit,
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedBuyOrder]);


    const fillBuyByWallet = () => {
        if (order.pricePerUnit.isEqualTo(0)) {
            const totalPrice = new BN(quote);
            setOrder({
                ...order,
                reqAmount: totalPrice.dividedBy(bestBuyPrice).decimalPlaces(activePair.baseAssetPrecision),
                pricePerUnit: new BN(bestBuyPrice),
                totalPrice,
                tradeFee: totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
            });
        } else {
            buyPriceHandler(
                quote.toString(),
                "totalPrice",
            );
        }
    };

    const fillBuyByBestPrice = () => {
        buyPriceHandler(
            bestBuyPrice.toString(),
            "pricePerUnit",
        );
    };


    const submit = async () => {
        if (!isLogin) {
            history.push(LoginRoute);
            return false
        }
        if (isLoading) {
            return false
        }
        setIsLoading(true)
        const submitOrder = await createOrder(activePair, "BUY", order)
        if (!submitOrder) {
            setIsLoading(false)
        }
        if (submitOrder.status === 200) {
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
                    type: t("buy"),
                    reqAmount: order.reqAmount,
                    pricePerUnit: order.pricePerUnit,
                }}
            />);
            setTimeout(() => dispatch(setLastTransaction(submitOrder.data.transactTime)), 2000);
        } else {
            toast.error(t("orders.error"));
            setAlert({
                ...alert, submit: true
            })
        }
        setIsLoading(false)
    }
    const submitButtonTextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoading} alt="linearLoading"/>
        }
        if (alert.submit) {
            return <span>{t("login.loginError")}</span>
        }
        if (isLogin) {
            return t("buy")
        }
        return t("pleaseLogin")
    }


    return (
        <div className={`column jc-between ${classes.content}`}>
            <div className="column jc-between">
                <p onClick={() => {
                    fillBuyByWallet()
                }}>
                    {t("orders.availableAmount")}:{" "}
                    <span className="cursor-pointer">
              {quote.toLocaleString()}{" "}
                        {t("currency." + activePair.quoteAsset)}
            </span>
                </p>
                <p onClick={() => {
                    fillBuyByBestPrice()
                }}>
                    {t("orders.bestOffer")}:{" "}
                    <span className="cursor-pointer">
                        {bestBuyPrice.toLocaleString()}{" "}{t("currency." + activePair.quoteAsset)}
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
                    after={t("currency." + activePair.baseAsset)}
                    value={order.stopPrice}
                    maxDecimal={activePair.baseAssetPrecision}
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
                value={order.reqAmount.toString()}
                maxDecimal={activePair.baseAssetPrecision}
                onchange={(e) => buyPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
            />

            {order.stopMarket ? (
                <NumberInput
                    customClass={classes.stopMarket}
                    lead={t("orders.pricePerUnit")}
                    isAllowed={false}
                    prefix="~"
                    after={t("currency." + activePair.quoteAsset)}
                    value={order.pricePerUnit.toString()}
                    maxDecimal={activePair.quoteAssetPrecision}
                    onchange={(e) => buyPriceHandler(e.target.value, "pricePerUnit")}
                />
            ) : (
                <NumberInput
                    lead={t("orders.pricePerUnit")}
                    after={t("currency." + activePair.quoteAsset)}
                    value={order.pricePerUnit.toString()}
                    maxDecimal={activePair.quoteAssetPrecision}
                    onchange={(e) => buyPriceHandler(e.target.value, "pricePerUnit")}
                />
            )}

            <div className="row ai-center">
                <span className="pl-05">{t("orders.marketBuyPrice")}</span>
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={order.stopMarket}
                    onChange={(e) => setOrder({...order, stopMarket: e.target.checked})}
                />
            </div>

            <NumberInput
                lead={t("orders.totalPrice")}
                value={order.totalPrice.toString()}
                maxDecimal={activePair.quoteAssetPrecision}
                after={t("currency." + activePair.quoteAsset)}
                onchange={(e) => buyPriceHandler(e.target.value, "totalPrice")}
                alert={alert.totalPrice}
            />

            <div className="column jc-between">
                <p>
                    {t("orders.tradeFee")}:{" "}
                    {order.tradeFee.toFormat()}{" "}
                    {t("currency." + activePair.baseAsset)}
                </p>
                <p>
                    {t("orders.getAmount")}:{" "}
                    {order.reqAmount.minus(order.tradeFee).decimalPlaces(activePair.baseAssetPrecision).toNumber()}{" "}
                    {t("currency." + activePair.baseAsset)}
                </p>
            </div>
            <Button
                buttonClass={`${classes.thisButton} ${alert.submit ? classes.alertSubmit : classes.buyOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                type="submit"
                onClick={submit}
                disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin || alert.totalPrice}
                buttonTitle={submitButtonTextHandler()}
            />
        </div>
    );
};

export default BuyOrder;