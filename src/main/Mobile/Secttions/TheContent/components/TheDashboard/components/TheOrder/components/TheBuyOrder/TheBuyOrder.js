import React, {useEffect, useState} from "react";
import classes from "./../../TheOrder.module.css";
import {Trans, useTranslation} from "react-i18next";
import VerticalNumberInput from "../../../../../../../../../../components/VerticalTextInput/VerticalNumberInput";
import {setLastTransaction} from "../../../../../../../../../../store/actions/auth";
import {connect} from "react-redux";
import {BN, parsePriceString} from "../../../../../../../../../../utils/utils";
import {useHistory} from "react-router-dom";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../components/Button/Button";
import {Login as LoginRoute} from "../../../../../../../../../../routes/routes";
import {createOrder} from "../../../../../../../../../Browser/Sections/Content/components/Dashboard/components/Order/api/order";
import {toast} from "react-hot-toast";
import {images} from "../../../../../../../../../../assets/images";



const TheBuyOrder = (props) => {

    const history = useHistory();
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const {wallets, activePair, tradeFee, bestBuyPrice, accessToken, isLogin, selectedBuyOrder} = props
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
        if(order.totalPrice.isGreaterThan(wallets[activePair.quoteAsset].free)){
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
            const totalPrice = new BN(wallets[activePair.quoteAsset].free);
            setOrder({
                ...order,
                reqAmount: totalPrice.dividedBy(bestBuyPrice).decimalPlaces(activePair.baseAssetPrecision),
                pricePerUnit: new BN(bestBuyPrice),
                totalPrice,
                tradeFee: totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
            });
        } else {
            buyPriceHandler(
                wallets[activePair.quoteAsset].free.toString(),
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
        const submitOrder = await createOrder(activePair, "BUY", accessToken, order)
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
            return <span>{t("buy")} {order.reqAmount.minus(order.tradeFee).decimalPlaces(activePair.baseAssetPrecision).toNumber()}{" "}
                {t("currency." + activePair.baseAsset)}</span>
        }
        return t("pleaseLogin")
    }


    const volumeTop = <div className={`container row jc-center ai-center font-size-sm`} onClick={() => {fillBuyByBestPrice()}}>
        <Icon iconName={`icon-plus font-size-sm flex`} customClass={`mx-1`}/>
        <span>{wallets[activePair.quoteAsset].free.toLocaleString()}{" "}{t("currency." + activePair.quoteAsset)}</span>
    </div>

    const pricePerUnitTop = <div className={`container row jc-center ai-center font-size-sm`} onClick={() => {fillBuyByWallet()}}>
        <Icon iconName={`icon-plus font-size-sm flex`} customClass={`mx-1`}/>
        <span>{bestBuyPrice.toLocaleString()}{" "}{t("currency." + activePair.quoteAsset)}</span>
    </div>

    const totalPriceTop = <div className={`container row jc-around ai-center font-size-sm`}>
        <p>{t("commission")}</p>
        <p>
            {order.tradeFee.toFormat()}{" "}
            {t("currency." + activePair.baseAsset)}
        </p>
    </div>



    return (
        <div className={`column jc-between ${classes.content}`}>

            <div className={`row jc-around`}>
                <div className={`col-48`}>
                    <VerticalNumberInput
                        top={volumeTop}
                        lead={t("volume")}
                        value={order.reqAmount.toString()}
                        maxDecimal={activePair.baseAssetPrecision}
                        onchange={(e) => buyPriceHandler(e.target.value, "reqAmount")}
                        //alert={alert.reqAmount}
                    />
                </div>
                <div className={`col-48`}>
                    <VerticalNumberInput
                        top={pricePerUnitTop}
                        lead={t("pricePerUnit")}
                        value={order.pricePerUnit.toString()}
                        maxDecimal={activePair.quoteAssetPrecision}
                        onchange={(e) => buyPriceHandler(e.target.value, "pricePerUnit")}
                    />
                </div>
            </div>
            <div className={`row jc-around`}>
                <div className={`col-98`}>
                    <VerticalNumberInput
                        top={totalPriceTop}
                        lead={t("totalPrice")}
                        value={order.totalPrice.toString()}
                        maxDecimal={activePair.quoteAssetPrecision}
                        onchange={(e) => buyPriceHandler(e.target.value, "totalPrice")}
                        //alert={alert.totalPrice}
                    />
                </div>
            </div>
            <div className={`row jc-around`}>
                <div className={`col-98`}>
                    <Button
                        buttonClass={`${classes.thisButton} ${alert.submit ? classes.alertSubmit : classes.buyOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                        type="submit"
                        onClick={submit}
                        disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin}
                        buttonTitle={submitButtonTextHandler()}
                    />
                </div>
            </div>



        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
        bestBuyPrice: state.exchange.activePairOrders.bestBuyPrice,
        selectedBuyOrder: state.exchange.activePairOrders.selectedBuyOrder,
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

export default connect(mapStateToProps, mapDispatchToProps)(TheBuyOrder);
