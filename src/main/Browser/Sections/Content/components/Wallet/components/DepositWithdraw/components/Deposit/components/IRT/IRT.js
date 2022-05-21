import React, {useEffect, useState} from "react";
import classes from "../../../../DepositWithdraw.module.css";
import {useLocation, useParams} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import NumberInput from "../../../../../../../../../../../../components/NumberInput/NumberInput";
import {BN, parsePriceString} from "../../../../../../../../../../../../utils/utils";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {cancelIRTDepositReq, getOpenPayments, sendIRTDepositReq} from "../../../../../../api/wallet";
import QRCode from "react-qr-code";
import moment from "moment-jalaali";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Countdown from "react-countdown";
import CallbackPage from "./components/CallbackPage/CallbackPage";
import {setIPGInitiate} from "../../../../../../../../../../../../store/actions";

const IRT = (props) => {

    const {t} = useTranslation();

    const [response, setResponse] = useState({});
    const [openPayment, setOpenPayment] = useState([]);
    const [cancel, setCancel] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(false);
    const [IRT, setIRT] = useState({
        amount: {value: "", error: []},
    })

    const apiBaseUrl = window.env.REACT_APP_API_BASE_URL;

    // const dataMin = 100000
    const dataMin = 1000
    const dataMax = 50000000

    const params = new URLSearchParams(useLocation().search);
    const paymentToken = params.get("token");
    const paymentStatus = params.get("payment_status");
    const errorCode = params.get("error_code");

    const {id} = useParams();

    const openPayments = async () => {
        const openPaymentReq = await getOpenPayments();
        if (openPaymentReq && openPaymentReq.status === 200) {
            setError(false)
            setOpenPayment(openPaymentReq.data)

        } else {
            setError(true)
        }

    }

    useEffect(() => {
        openPayments().then(() => setLoading(false))
    }, [props.wallet]);


    const cancelIRTTx = async (reference) => {
        setLoading(true)
        setOpenPayment([])
        setIRT({
            amount: {value: "", error: []},
        })
        const cancelIRTReq = await cancelIRTDepositReq(reference);
        if (cancelIRTReq && cancelIRTReq.status === 200) {
            setCancel(true)
            setLoading(false)
            toast.error(<Trans
                i18nKey="DepositWithdrawTx.cancelPayment"
                /*values={{
                    asset: t("currency." + id),
                    amount: amount.value,
                }}*/
            />);
            //await getIRTTx()
        } else {

        }
        setLoading(false)
    }

    const submit = async (e) => {
        e.preventDefault();


        if (!isFormValid()) {
            return false
        }
        setLoading(true)
        const amount = new BN(parsePriceString(IRT.amount.value)).multipliedBy(10)

        const SendAmountReq = await sendIRTDepositReq(amount);
        if (SendAmountReq && SendAmountReq.status === 200) {
            setError(false)
            setResponse(SendAmountReq.data)
            openPayments().then(() => setLoading(false))
            toast.success(<Trans
                i18nKey="DepositWithdrawTx.IRTsuccess"
                values={{
                    amount: IRT.amount.value,
                }}
            />);

        } else {
            setError(true)
            setLoading(false)
        }

    };

    const inputHandler = (e) => {

        let errorMessage = []
        const min = parsePriceString(e.target.dataset.min)
        const max = parsePriceString(e.target.dataset.max)
        const value = parsePriceString(e.target.value)

        const amountValidator = () => {
            if (typeof min === undefined) {
                return false;
            }
            if (typeof max === undefined) {
                return false;
            }
            if (value < min) {
                return false;
            }
            if (value > max) {
                return false;
            }
            return true;
        }

        if (!amountValidator()) {
            errorMessage.push(<Trans
                i18nKey="DepositWithdraw.allowable"
                values={{
                    name: t(e.target.dataset.name),
                    min: min.toLocaleString(),
                    max: max.toLocaleString()
                }}
            />)
        }
        setIRT({
            ...IRT,
            [e.target.dataset.name]: {value: e.target.value, error: errorMessage}
        })
    }

    const isFormValid = () => {
        let inputs = {...IRT}
        const hasError = Object.values(IRT).find(input => input.error.length > 0)
        if (hasError) return false
        let isEmpty = false

        for (const key in inputs) {
            if (inputs[key].value.length === 0) {
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key]: {
                        ...inputs[key],

                        error: [<Trans
                            i18nKey="DepositWithdraw.emptyInput"
                            values={{
                                name: t(key),
                            }}
                        />]
                    }
                }
            }
        }
        setIRT(inputs);
        return !isEmpty;
    }

    const buttonClickHandler = async (e) => {
        window.open(`${apiBaseUrl}/ipg/v1/payment/pay/${openPayment[0].reference}`)
        setDisable(true)
        props.ipgLock(new Date().getTime() + 2 * 60 * 1000)
    }

    useEffect(() => {
        if(props.lockTime && new Date().getTime() < props.lockTime) {
            setDisable(true)
        }
    }, []);

    const buttonTitleHandler = (openPaymentAmount) => {
        if (disable) {
            return <span className={`flex row jc-between`}>{t('DepositWithdraw.pay')} ( <Countdown
                date={props.lockTime && new Date().getTime() < props.lockTime  ? new Date(parseInt(props.lockTime)) : Date.now() + 120000}
                renderer={props => <div>{props.minutes}:{props.seconds}</div>}
                onComplete={() => setDisable(false)}
            />)</span>
        }
        return <span>{t('DepositWithdraw.pay')} ({openPaymentAmount} {t("currency." + id)})</span>
    }



    const content = () => {



        if (loading) {
            return <div className={`px-1 py-2 column jc-between ${classes.content}`}>
                <Loading/>
            </div>
        }
        if (openPayment.length > 0) {

            const openPaymentAmount = new BN(`${openPayment[0].amount}`).multipliedBy(0.1).toFormat()
            return <div className={`px-1 py-2 row jc-between ${classes.content}`}>

                    <div className={`column col-70 jc-around ai-start`}>
                        <Trans
                            i18nKey="DepositWithdraw.irtText"
                            values={{
                                amount: openPaymentAmount,
                                date: `${moment(new Date(openPayment[0].createDate).getTime()- new Date(openPayment[0].createDate).getTimezoneOffset()*60*1000).format("jYY/jMM/jDD")}`,
                                time: `${moment(new Date(openPayment[0].createDate).getTime()- new Date(openPayment[0].createDate).getTimezoneOffset()*60*1000).format("HH:mm:ss")}`,
                            }}
                        />
                        <div className={`row`}>
                            <Button
                                buttonClass={`${classes.pay} ${classes.disable} px-2 ml-05`}
                                buttonTitle={buttonTitleHandler(openPaymentAmount)}
                                type="submit"
                                onClick={(e) => buttonClickHandler(e)}
                                disabled={disable}

                            />
                            <Button
                                buttonClass={`${classes.cancel} ${classes.disable} px-2 mr-05`}
                                buttonTitle={t('DepositWithdraw.cancel')}
                                type="submit"
                                onClick={() => cancelIRTTx(openPayment[0].reference)}
                                disabled={disable}
                            />
                        </div>

                    </div>
                    <div className={`col-30 flex jc-center ai-center`}>
                        {!disable ?<QRCode
                            value={`${apiBaseUrl}/ipg/v1/payment/pay/${openPayment[0].reference}`}
                            bgColor="var(--cardBody)"
                            fgColor="var(--textColor)"
                            level='L'
                            size={140}
                        /> : ""}
                    </div>






            </div>
        }
        return <form onSubmit={(e) => submit(e)} className={`px-1 py-2 column jc-around ${classes.content}`}>

                    <Trans
                        i18nKey="DepositWithdraw.IRTFormText"
                        values={{
                            min: dataMin.toLocaleString(),
                            max: dataMax.toLocaleString()
                        }}
                    />

                <NumberInput
                    lead={t("orders.amount")}
                    after={t("currency." + id)}
                    value={IRT.amount.value}
                    data-name="amount"
                    data-type="input"
                    data-min={dataMin}
                    data-max={dataMax}
                    customClass={`${classes.depositIRTInput} width-50`}
                    onchange={(e) => inputHandler(e)}
                    alerts={IRT.amount.error}
                />
                <Button
                    buttonClass={`${classes.IRTButton} ${classes.withdrawal}`}
                    buttonTitle={t("DepositWithdraw.submitPaymentReq")}
                    type="submit"
                />

        </form>

    }


    return (
        <>
            {paymentStatus !== null ? <CallbackPage paymentToken={paymentToken} paymentStatus={paymentStatus} errorCode={errorCode}/> : ""}
            { content()}
        </>

    )

}
const mapStateToProps = (state) => {
    return {
        wallet: state.auth.wallets.IRT.free,
        lockTime: state.exchange.ipgLock
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        ipgLock: (lockTime) => dispatch(setIPGInitiate(lockTime)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IRT);