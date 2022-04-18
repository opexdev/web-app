import React, {Fragment, useEffect, useState} from "react";
import classes from "./CallbackPage.module.css";
import {images} from "../../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../../components/Button/Button";
import {useTranslation} from "react-i18next";
import * as Routes from "../../../../../../../../../../../../../../routes/routes";
import {Link, useHistory} from "react-router-dom";
import {verifyIRTDepositReq} from "../../../../../../../../api/wallet";
import Loading from "../../../../../../../../../../../../../../components/Loading/Loading";




const CallbackPage = (props) => {

    const {paymentToken , paymentStatus , errorCode} = props

    const [status , setStatus] = useState()
    const [noData , setNoData] = useState()
    const [verifyResult , setVerifyResult] = useState()
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const {t} = useTranslation();

    const verify = async () => {
        const verifyReq = await verifyIRTDepositReq(paymentToken , paymentStatus);
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

            if (errorCode !== null){

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
        <Fragment>
            <div onClick={() => history.push(Routes.Wallet + "/IRT")} className={`${classes.container} flex jc-center ai-center`}/>
            { loading ?<div className={`${classes.content} card-border`}>
                    <Loading/>
                </div>
                :
                <div className={`${classes.content} ${status ? "text-green" : "text-red"} card-border column jc-around ai-center py-2`}>
                    {noData ? <span className={`text-color`}>{t("CallbackPage.noData")}</span> :
                        <Fragment>
                            <img src={status ? images.approve : images.reject} alt={paymentStatus}/>
                            <div className={`column jc-center ai-center`}>
                                <span>{status ? t("CallbackPage.ok") : t("CallbackPage.failed")}</span>
                                {errorCode !== null && <span className={`text-color font-size-sm`}>{t("CallbackPage.errorMessage")} : <span>{t("IPGErrorCode." + errorCode)}</span></span>}

                            </div>
                        </Fragment>
                    }
                    <Link
                        to={Routes.Wallet + "/IRT"}
                    >
                        <Button
                            buttonClass={`${classes.thisButton} px-3`}
                            //onClick={}
                            buttonTitle={t("close")}
                        />
                    </Link>

                </div>
            }

        </Fragment>

);
};

export default CallbackPage;
