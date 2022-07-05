import React, {useEffect, useState} from "react";
import classes from "./CallbackPage.module.css";
import {images} from "../../../../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import * as Routes from "../../../../../../../../../../../../../../Routes/routes";
import {Link, useNavigate} from "react-router-dom";
import {verifyIRTDepositReq} from "../../../../../../../../api/wallet";
import Loading from "../../../../../../../../../../../../../../../../components/Loading/Loading";


const CallbackPage = (props) => {

    const {paymentToken, paymentStatus, errorCode} = props

    const [status, setStatus] = useState()
    const [noData, setNoData] = useState()
    const [verifyResult, setVerifyResult] = useState()
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate();
    const {t} = useTranslation();

    const verify = async () => {
        const verifyReq = await verifyIRTDepositReq(paymentToken, paymentStatus);
        if (verifyReq && verifyReq.status === 200) {

            setVerifyResult(verifyReq.data)

        } else {
            setError(true)
        }
    }

    useEffect(() => {
        verify(paymentToken, paymentStatus).then(r => {
            if (paymentStatus === "OK") {
                setStatus(true)
            }
            if (paymentStatus === "FAILED") {
                setStatus(false)
            }
            if (paymentStatus !== "OK" && paymentStatus !== "FAILED") {
                setNoData(true)
            }
            if (errorCode !== null) {

            }
            setLoading(false)
        })
    }, []);

    const ipgStatus = (paymentStatus) => {
        switch (paymentStatus) {
            case 'OK':
                return 'OK';
            case 'FAILED':
                return 'FAILED';
            default:
                return '';
        }
    };

    return (
        <>
            <div onClick={() => navigate(Routes.Wallet + "/IRT", {replace: true})}
                 className={`${classes.container} flex jc-center ai-center`}/>
                {loading ? <div className={`${classes.content} card-border`}><Loading/></div>
                :
                <div
                    className={`${classes.content} ${status ? "text-green" : "text-red"} card-border column jc-around ai-center py-2`}>
                    {noData ? <span className={`text-color`}>{t("CallbackPage.noData")}</span> :
                        <>
                            <img src={status ? images.approve : images.reject} alt={paymentStatus}/>
                            <div className={`column jc-center ai-center`}>
                                <span>{status ? t("CallbackPage.ok") : t("CallbackPage.failed")}</span>
                                {errorCode !== null && <span
                                    className={`text-color font-size-sm`}>{t("CallbackPage.errorMessage")} : <span>{t("IPGErrorCode." + errorCode)}</span></span>}

                            </div>
                        </>
                    }
                    <Link to={Routes.Wallet + "/IRT"}>
                        <Button
                            buttonClass={`${classes.thisButton} px-3`}
                            buttonTitle={t("close")}
                        />
                    </Link>
                </div>
            }
        </>
    );
};

export default CallbackPage;
