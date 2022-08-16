import React, {useEffect, useState} from "react";
import classes from "../../../../DepositWithdraw.module.css";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import NumberInput from "../../../../../../../../../../../../../../components/NumberInput/NumberInput";
import {BN, parsePriceString} from "../../../../../../../../../../../../../../utils/utils";
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import QRCode from "react-qr-code";
import moment from "moment-jalaali";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../../../../../components/Loading/Loading";
import Countdown from "react-countdown";
import CallbackPage from "./components/CallbackPage/CallbackPage";
import {setIPGInitiate} from "../../../../../../../../../../../../../../store/actions";
import {useGetIpgOpenInvoice, useIPGDeposit} from "../../../../../../../../../../../../../../queries";
import {cancelIPGDepositReq, sendIPGDepositReq} from "js-api-client";
import Error from "../../../../../../../../../../../../../../components/Error/Error";


const IRTDeposit = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const KYCStatus = useSelector((state) => state.auth.kyc)



    const [sendIPGLoading, setIPGIsLoading] = useState(false)

    const params = new URLSearchParams(useLocation().search);
    const paymentStatus = params.get("payment_status");

    const [disable, setDisable] = useState(false);
    const [req, setReq] = useState({amount: {value: "", error: []}})

    const apiBaseUrl = window.env.REACT_APP_API_BASE_URL;

    const dataMin = 1000
    const dataMax = 50000000

    const fund = useSelector((state) => state.auth.wallets.IRT.free)
    const ipgLock = useSelector((state) => state.exchange.ipgLock)

    const {id} = useParams();

    const {data: openInVoice, isLoading, refetch} = useGetIpgOpenInvoice()
    const {refetch : refetchIPGInvoice} = useIPGDeposit()

    useEffect(() => {
        refetch()
    }, [fund]);


    const cancelIPGInvoice = (reference) => {
        setIPGIsLoading(true)
        setReq({amount: {value: "", error: []}})
        cancelIPGDepositReq(reference)
            .then(() => {
                toast.error(t("DepositWithdrawTx.cancelPayment"))
                refetchIPGInvoice()
                refetch()
            }).finally(() => setIPGIsLoading(false));
    }

    const submit = async (e) => {
        e.preventDefault();
        const amount = new BN(parsePriceString(req.amount.value)).multipliedBy(10)

        if (amount.isGreaterThan(dataMax)  || new BN(parsePriceString(req.amount.value)).isLessThan(dataMin)) return false
        setIPGIsLoading(true)
        sendIPGDepositReq(amount).then(() => {
            toast.success(<Trans
                i18nKey="DepositWithdrawTx.IRTsuccess"
                values={{
                    amount: req.amount.value,
                }}
            />)
            refetchIPGInvoice()
            refetch()
        }).finally(() => setIPGIsLoading(false));
    };

    const inputHandler = (e) => {
        let errorMessage = []
        const min = parsePriceString(e.target.dataset.min)
        const max = parsePriceString(e.target.dataset.max)
        const value = parsePriceString(e.target.value)

        const amountValidator = () => {
            if (typeof min === undefined || typeof max === undefined) {
                return false;
            }
            if (value < min) {
                return false;
            }
            return value <= max;
        }
        if (!amountValidator()) {
            errorMessage.push(<Trans
                i18nKey="DepositWithdraw.IRTAllowable"
                values={{
                    name: t(e.target.dataset.name),
                    min: min.toLocaleString(),
                    max: max.toLocaleString()
                }}
            />)
        }
        setReq({...req, [e.target.dataset.name]: {value: e.target.value, error: errorMessage}})
    }

    const openIPG = () => {
        window.open(`${apiBaseUrl}/ipg/v1/payment/pay/${openInVoice[0].reference}`)
        setDisable(true)
        dispatch(setIPGInitiate(new Date().getTime() + 2 * 60 * 1000))
    }

    useEffect(() => {
        if (ipgLock && new Date().getTime() < ipgLock) setDisable(true)
    }, [ipgLock]);

    const payButtonTitle = (amount) => {
        if (disable) {
            return <span className={`flex row jc-between`}>{t('DepositWithdraw.pay')} ( <Countdown
                date={ipgLock && new Date().getTime() < ipgLock ? new Date(parseInt(ipgLock)) : Date.now() + 120000}
                renderer={props => <div>{props.minutes}:{props.seconds}</div>}
                onComplete={() => setDisable(false)}
            />)</span>
        }
        return <span>{t('DepositWithdraw.pay')} ({amount} {t("currency." + id)})</span>
    }

    if (KYCStatus !== "ACCEPTED") return <Error errorMsg={t('errorPage.needKYC')}/>

    const content = () => {
        if (isLoading || sendIPGLoading) {
            return <div className={`px-1 py-2 column jc-between ${classes.content}`}>
                <Loading/>
            </div>
        }
        if (openInVoice?.length > 0) {
            const amount = new BN(`${openInVoice[0].amount}`).multipliedBy(0.1).toFormat()
            return <div className={`px-1 py-2 row jc-between ${classes.content}`}>

                <div className={`column col-70 jc-around ai-start`}>
                    <Trans
                        i18nKey="DepositWithdraw.IRTText"
                        values={{
                            amount: amount,
                            date: `${moment(new Date(openInVoice[0].createDate).getTime() - new Date(openInVoice[0].createDate).getTimezoneOffset() * 60 * 1000).format("jYY/jMM/jDD")}`,
                            time: `${moment(new Date(openInVoice[0].createDate).getTime() - new Date(openInVoice[0].createDate).getTimezoneOffset() * 60 * 1000).format("HH:mm:ss")}`,
                        }}
                    />
                    <div className={`row`}>
                        <Button
                            buttonClass={`${classes.pay} ${classes.disable} px-2 ml-05`}
                            buttonTitle={payButtonTitle(amount)}
                            onClick={openIPG}
                            disabled={disable}

                        />
                        <Button
                            buttonClass={`${classes.cancel} ${classes.disable} px-2 mr-05`}
                            buttonTitle={t('DepositWithdraw.cancel')}
                            onClick={() => cancelIPGInvoice(openInVoice[0].reference)}
                            disabled={disable}
                        />
                    </div>

                </div>
                <div className={`col-30 flex jc-center ai-center`}>
                    {!disable ? <QRCode
                        value={`${apiBaseUrl}/ipg/v1/payment/pay/${openInVoice[0].reference}`}
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
                after={t("currency."+ id)}
                value={req.amount.value}
                data-name="amount"
                data-type="input"
                data-min={dataMin}
                data-max={dataMax}
                customClass={`${classes.depositIRTInput} width-50`}
                onchange={(e) => inputHandler(e)}
                alerts={req.amount.error}
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
            {paymentStatus && <CallbackPage/> }
            {content()}
        </>

    )
}

export default IRTDeposit;