import React, {useEffect, useState} from "react";
import classes from "./CallbackPage.module.css";
import {images} from "../../../../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import * as Routes from "../../../../../../../../../../../../../../Routes/routes";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Loading from "../../../../../../../../../../../../../../../../components/Loading/Loading";
import {verifyIPGDepositReq} from "js-api-client";


const CallbackPage = () => {
    const params = new URLSearchParams(useLocation().search);
    const paymentToken = params.get("token");
    const paymentStatus = params.get("payment_status");
    const errorCode = params.get("error_code");

    const [status, setStatus] = useState()
    const [noData, setNoData] = useState()
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        verifyIPGDepositReq(paymentToken, paymentStatus)
            .finally(() => {
                if (paymentStatus === "OK") setStatus(true)
                if (paymentStatus === "FAILED") setStatus(false)
                if (paymentStatus !== "OK" && paymentStatus !== "FAILED") setNoData(true)
                setLoading(false)
            })
    }, [paymentToken, paymentStatus]);

    return (
        <>
            <div onClick={() => navigate(Routes.Wallet + "/IRT", {replace: true})}
                 className={`${classes.container} flex jc-center ai-center`}/>
            {loading ?
                <div className={`${classes.content} card-border`}><Loading/></div>
                :
                <div
                    className={`${classes.content} ${status ? "text-green" : "text-red"} card-border column jc-around ai-center py-2`}>
                    {noData ? <span className={`text-color`}>{t("CallbackPage.noData")}</span> :
                        <>
                            <img src={status ? images.approve : images.reject} alt={paymentStatus}/>
                            <div className={`column jc-center ai-center`}>
                                <span>{status ? t("CallbackPage.ok") : t("CallbackPage.failed")}</span>
                                {errorCode !== null && <span
                                    className={`text-color fs-0-7`}>{t("CallbackPage.errorMessage")} : <span>{t("IPGErrorCode." + errorCode)}</span></span>}
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
