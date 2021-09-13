import React, {useState, useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";
import {BN, parsePriceString} from "../../../../../../utils/utils";
import classes from "../../Order.module.css";
import NumberInput from "../../../../../../components/NumberInput/NumberInput";
import {connect} from "react-redux";
import Button from "../../../../../../components/Button/Button";
import {createOrder} from "../../api/order";
import {images} from "../../../../../../assets/images";
import {setLastTransaction} from "../../../../../../store/actions/auth";
import {toast} from "react-hot-toast";
import {useHistory} from "react-router-dom";
import {Login as LoginRoute} from "../../../../../../routes/routes";

const SellOrder = (props) => {
    const history = useHistory();
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const {wallets, activePair, tradeFee, bestSellPrice, accessToken, isLogin, selectedSellOrder} = props
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
    }, [order, activePair])


    const currencyValidator = (key, val, rule) => {
        if (!val.isZero() && val.isLessThan(rule.min)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: activePair.baseRange.min,
                            currency: t("currency." + activePair.base),
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
                            max: activePair.baseRange.max,
                            currency: t("currency." + activePair.base),
                        }}
                    />)
            })
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

    const sellPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = new BN(value);
                currencyValidator("reqAmount", reqAmount, activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order.pricePerUnit).decimalPlaces(activePair.quoteMaxDecimal),
                    tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(activePair.quoteMaxDecimal),
                    tradeFee: order.reqAmount.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(activePair.baseMaxDecimal);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? req.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal) : new BN(0),
                });
                currencyValidator("reqAmount", req, activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal),
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
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteMaxDecimal),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedSellOrder]);

    const fillSellByWallet = () => {
        if (order.pricePerUnit.isEqualTo(0)) {
            const totalPrice = new BN(wallets[activePair.quote].free);
            setOrder({
                ...order,
                reqAmount: totalPrice.dividedBy(bestSellPrice).decimalPlaces(activePair.baseMaxDecimal),
                pricePerUnit: new BN(bestSellPrice),
                totalPrice,
                tradeFee: totalPrice.multipliedBy(tradeFee[activePair.quote]).decimalPlaces(activePair.baseMaxDecimal),
            });
        } else {
            sellPriceHandler(
                wallets[activePair.quote].free.toString(),
                "totalPrice",
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
        if(order.reqAmount.isGreaterThan(wallets[activePair.base].free)){
            return setAlert({
                ...alert,
                reqAmount: t('orders.notEnoughBalance')
            })
        }
        return setAlert({
            ...alert,
            reqAmount: null
        })
    }, [order.reqAmount]);

    const submit = async () => {
        if (!isLogin) {
            history.push(LoginRoute);
            return false
        }
        if (isLoading) {
            return false
        }
        setIsLoading(true)
        const submitOrder = await createOrder(activePair, "SELL", accessToken, order)
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
                    name: t("currency." + activePair.base),
                    type: t("sell"),
                    reqAmount: order.reqAmount,
                    pricePerUnit: order.pricePerUnit,
                }}
            />);
            setTimeout(() => props.setLastTransaction(submitOrder.data.transactTime), 2000);
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
            return t("sell")
        }
        return t("pleaseLogin")
    }

    return (
        <div className={`column jc-between ${classes.content}`}>
            <div className="column jc-center">
                <p onClick={() => fillSellByWallet()}>
                    {t("orders.availableAmount")}:{" "}
                    <span className="cursor-pointer">
            {wallets[activePair.base].free.toLocaleString()}{" "}
                        {t("currency." + activePair.base)}
          </span>
                </p>
                <p onClick={() => fillSellByBestPrice()}>
                    {t("orders.bestOffer")}:{" "}
                    <span className="cursor-pointer">
                        {bestSellPrice.toLocaleString()}{" "}{t("currency." + activePair.quote)}
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
                    after={t("currency." + props.activePair.base)}
                    value={order.stopPrice}
                    maxDecimal={props.activePair.baseMaxDecimal}
                    onchange={(value) =>
                        setOrder({...order, stopPrice: value.floatValue})
                    }
                />
            ) : (
                ""
            )}*/}

            <NumberInput
                lead={t("orders.amount")}
                after={t("currency." + activePair.base)}
                value={order.reqAmount.toString()}
                maxDecimal={activePair.baseMaxDecimal}
                onchange={(e) => sellPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
            />

            {order.stopMarket ? (
                <NumberInput
                    customClass={classes.stopMarket}
                    lead={t("orders.pricePerUnit")}
                    isAllowed={false}
                    prefix="~"
                    after={t("currency." + activePair.quote)}
                    value={order.pricePerUnit.toString()}
                    maxDecimal={activePair.quoteMaxDecimal}
                    onchange={(e) => sellPriceHandler(e.target.value, "pricePerUnit")}
                />
            ) : (
                <NumberInput
                    lead={t("orders.pricePerUnit")}
                    after={t("currency." + activePair.quote)}
                    value={order.pricePerUnit.toString()}
                    maxDecimal={activePair.quoteMaxDecimal}
                    onchange={(e) => sellPriceHandler(e.target.value, "pricePerUnit")}
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
                value={order.totalPrice.toString()}
                maxDecimal={activePair.quoteMaxDecimal}
                after={t("currency." + activePair.quote)}
                onchange={(e) => sellPriceHandler(e.target.value, "totalPrice")}
            />

            <div className="column jc-center">
                <p>
                    {t("orders.tradeFee")}:{" "}
                    {order.tradeFee.toFormat()}{" "}
                    {t("currency." + activePair.quote)}
                </p>
                <p>
                    {t("orders.getAmount")}:{" "}
                    {order.reqAmount.minus(order.tradeFee).decimalPlaces(activePair.baseMaxDecimal).toNumber()}{" "}
                    {t("currency." + activePair.quote)}
                </p>
            </div>
            <Button
                buttonClass={`${classes.thisButton} ${alert.submit ? classes.alertSubmit : classes.sellOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                type="submit"
                onClick={submit}
                disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin}
                buttonTitle={submitButtonTextHandler()}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.global.activePair,
        bestSellPrice: state.global.activePairOrders.bestSellPrice,
        selectedSellOrder: state.global.activePairOrders.selectedSellOrder,
        wallets: state.auth.wallets,
        tradeFee: state.auth.tradeFee,
        accessToken: state.auth.accessToken,
        isLogin: state.auth.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLastTransaction: (time) => dispatch(setLastTransaction(time)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellOrder);
