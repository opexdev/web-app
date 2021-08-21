import React, {useState, useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";
import {parsePriceString} from "../../../../../../utils/utils";
import classes from "../../Order.module.css";
import NumberInput from "../../../../../../components/NumberInput/NumberInput";
import {connect} from "react-redux";
import Button from "../../../../../../components/Button/Button";
import {createOrder} from "../../api/order";
import {images} from "../../../../../../assets/images";
import {setLastTransaction} from "../../../../../../store/actions/auth"

const BuyOrder = (props) => {
    const {t} = useTranslation();
    const [alert, setAlert] = useState({
        reqAmount: null,
        submit: false,
    });

    const [order, setOrder] = useState({
        tradeFee: 0.0,
        stopLimit: false,
        stopMarket: false,
        stopPrice: 0.0,
        reqAmount: 0.0,
        pricePerUnit: 0.0,
        totalPrice: 0.0,
    });

    useEffect(() => {
        if (alert.submit) {
            setAlert({
                ...alert, submit: false
            })
        }
    }, [order, props.activePair])

    const [loading, setLoading] = useState(false)

    const currencyValidator = (key, val, rule) => {
        if (val < rule.min) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: props.activePair.baseRange.min,
                            currency: t("currency." + props.activePair.base),
                        }}
                    />
                ),
            });
        }
        if (val > rule.max) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.maxOrder"
                        values={{
                            max: props.activePair.baseRange.max,
                            currency: t("currency." + props.activePair.base),
                        }}
                    />
                ),
            });
        }
        if (!Number.isInteger(val / rule.step)) {
            return setAlert({...alert, [key]: t("orders.divisibility")});
        }
        return setAlert({...alert, [key]: null});
    };

    const buyPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = value;
                currencyValidator("reqAmount", reqAmount, props.activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount: value,
                    totalPrice: (reqAmount * order.pricePerUnit).toFixed(
                        props.activePair.quoteMaxDecimal,
                    ),
                    tradeFee: (
                        reqAmount * props.auth.tradeFee[props.activePair.quote]
                    ).toFixed(props.activePair.baseMaxDecimal),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = value;
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: (order.reqAmount * pricePerUnit).toFixed(
                        props.activePair.quoteMaxDecimal,
                    ),
                    tradeFee: (
                        order.reqAmount * props.auth.tradeFee[props.activePair.quote]
                    ).toFixed(props.activePair.baseMaxDecimal),
                });
                break;
            case "totalPrice":
                const totalPrice = value;
                const req = (totalPrice / order.pricePerUnit).toFixed(
                    props.activePair.baseMaxDecimal,
                );
                setOrder({
                    ...order,
                    reqAmount: req,
                    totalPrice: value,
                    tradeFee: (
                        (totalPrice / order.pricePerUnit) *
                        props.auth.tradeFee[props.activePair.quote]
                    ).toFixed(props.activePair.baseMaxDecimal),
                });
                currencyValidator("reqAmount", req, props.activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee:
                prevState.totalPrice * props.auth.tradeFee[props.activePair.quote],
        }));
    }, [props.auth]);

    useEffect(() => {
        buyPriceHandler(
            props.activePairOrders.bestBuyPrice.toString(),
            "pricePerUnit",
        );
    }, [order.stopMarket]);

    useEffect(() => {
        const amount = props.activePairOrders.selectedBuyOrder.amount;
        const pricePerUnit = props.activePairOrders.selectedBuyOrder.pricePerUnit;
        setOrder({
            ...order,
            reqAmount: amount,
            pricePerUnit: pricePerUnit,
            totalPrice: (amount * pricePerUnit).toFixed(
                props.activePair.quoteMaxDecimal,
            ),
            tradeFee: (amount * props.auth.tradeFee[props.activePair.quote]).toFixed(
                props.activePair.baseMaxDecimal,
            ),
        });
        currencyValidator("reqAmount", amount, props.activePair.baseRange);
    }, [props.activePairOrders.selectedBuyOrder]);

    const fillBuyByWallet = () => {
        if (order.pricePerUnit === 0) {
            const totalPrice = props.auth.wallet[props.activePair.quote];
            setOrder({
                reqAmount: totalPrice / props.activePair.bestBuyPrice,
                pricePerUnit: props.activePair.bestBuyPrice,
                totalPrice: totalPrice,
                tradeFee: totalPrice * props.auth.tradeFee[props.activePair.quote],
            });
        } else {
            buyPriceHandler(
                props.auth.wallet[props.activePair.quote].toString(),
                "totalPrice",
            );
        }
    };

    const fillBuyByBestPrice = () => {
        buyPriceHandler(
            props.activePairOrders.bestBuyPrice.toString(),
            "pricePerUnit",
        );
    };

    const submit = async () => {
        setLoading(true)
        const submitOrder = await createOrder(props.activePair, "BUY", props.auth.accessToken, order)
        if (!submitOrder) {
            setLoading(false)
        }
        if (submitOrder.status === 200) {
            setOrder({
                tradeFee: 0.0,
                stopLimit: false,
                stopMarket: false,
                stopPrice: 0.0,
                reqAmount: 0.0,
                pricePerUnit: 0.0,
                totalPrice: 0.0,
            })
            setTimeout(()=>props.setLastTransaction(submitOrder.data.transactTime), 2000);
        } else {
            setAlert({
                ...alert, submit: true
            })
        }
        setLoading(false)
    }
    const submitButtonTextHandler = () => {
        if (loading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoading} alt="linearLoading"/>
        }
        if (alert.submit) {
            return <span>{t("login.loginError")}</span>
        }
        if (props.auth.isLogin) {
            return t("buy")
        }
        return t("pleaseLogin")
    }

    return (
        <div className={`column jc-between ${classes.content}`}>
            <div className="column jc-between">
                <p onClick={() => fillBuyByWallet()}>
                    {t("orders.availableAmount")}:{" "}
                    <span className="cursor-pointer">
              {props.auth.wallets[props.activePair.quote].free.toLocaleString()}{" "}
                        {t("currency." + props.activePair.quote)}
            </span>
                </p>
                <p onClick={() => fillBuyByBestPrice()}>
                    {t("orders.bestOffer")}:{" "}
                    <span className="cursor-pointer">
              {props.activePairOrders.bestBuyPrice.toLocaleString()}{" "}
                        {t("currency." + props.activePair.quote)}
            </span>
                </p>
            </div>

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
                    after={t("currency." + props.activePair.base)}
                    value={order.stopPrice}
                    maxDecimal={props.activePair.baseMaxDecimal}
                    onchange={(value) =>
                        setOrder({...order, stopPrice: value.floatValue})
                    }
                />
            ) : (
                ""
            )}

            <NumberInput
                lead={t("orders.amount")}
                after={t("currency." + props.activePair.base)}
                value={order.reqAmount}
                maxDecimal={props.activePair.baseMaxDecimal}
                onchange={(e) => buyPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
            />

            {order.stopMarket ? (
                <NumberInput
                    customClass={classes.stopMarket}
                    lead={t("orders.pricePerUnit")}
                    isAllowed={false}
                    prefix="~"
                    after={t("currency." + props.activePair.quote)}
                    value={order.pricePerUnit}
                    maxDecimal={props.activePair.quoteMaxDecimal}
                    onchange={(e) => buyPriceHandler(e.target.value, "pricePerUnit")}
                />
            ) : (
                <NumberInput
                    lead={t("orders.pricePerUnit")}
                    after={t("currency." + props.activePair.quote)}
                    value={order.pricePerUnit}
                    maxDecimal={props.activePair.quoteMaxDecimal}
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
                value={order.totalPrice}
                maxDecimal={props.activePair.quoteMaxDecimal}
                after={t("currency." + props.activePair.quote)}
                onchange={(e) => buyPriceHandler(e.target.value, "totalPrice")}
            />

            <div className="column jc-between">
                <p>
                    {t("orders.tradeFee")}:{" "}
                    {order.tradeFee === "NaN" ? 0 : order.tradeFee}{" "}
                    {t("currency." + props.activePair.base)}
                </p>
                <p>
                    {t("orders.getAmount")}:{" "}
                    {order.reqAmount === "NaN" || order.tradeFee === "NaN"
                        ? 0
                        : (order.reqAmount - order.tradeFee)
                            .toFixed(props.activePair.baseMaxDecimal)
                            .toLocaleString()}{" "}
                    {t("currency." + props.activePair.base)}
                </p>
            </div>


            <Button
                buttonClass={`${classes.thisButton} ${alert.submit ? classes.alertSubmit : classes.buyOrder} ${loading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                type="submit"
                onClick={submit}
                disabled={alert.reqAmount || order.reqAmount === 0 || !props.auth.isLogin}
                buttonTitle={submitButtonTextHandler()}
            />


        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.global.activePair,
        activePairOrders: state.global.activePairOrders,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLastTransaction: (time) => dispatch(setLastTransaction(time)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyOrder);
