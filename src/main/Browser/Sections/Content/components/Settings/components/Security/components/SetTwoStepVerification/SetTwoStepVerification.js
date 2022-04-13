import React, {useEffect, useState} from "react";
import classes from "./SetTwoStepVerification.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getToken} from "../../../../../../../../../../pages/Login/api/auth";
import {CheckUserSecurityConfigs} from "../../../../api/settings";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import ActivateOTP from "./components/ActivateOTP";
import DisableOTP from "./components/DisableOTP";

const SetTwoStepVerification = () => {

    const {t} = useTranslation();


    const [error, setError] = useState(false);
    const [OTPStatus, setOTPStatus] = useState(undefined);
    const username = useSelector(state => state.auth.username);



    const CheckUserSecurityConfigsDataReq = async () => {
        let panelToken = await getToken();
        const CheckUserSecurityConfigsData = await CheckUserSecurityConfigs(panelToken, username)
        if (CheckUserSecurityConfigsData && CheckUserSecurityConfigsData.status === 200) {
            //setLoading(false)
            setOTPStatus(CheckUserSecurityConfigsData.data.otp)
        } else {
            setError(true)
            //setLoading(false)
        }
    }
    useEffect(() => {
        CheckUserSecurityConfigsDataReq().then(r => {})
    }, []);


    const content = () => {
        if (error) {
            return <Error/>
        }
        if (typeof OTPStatus === "undefined") {
            return <Loading/>
        }
        if (OTPStatus) {
            return <DisableOTP setOTP={setOTPStatus}/>
        }
        if (!OTPStatus) {
            return <ActivateOTP setOTP={setOTPStatus}/>
        }
    }


    return (
        <div className="container pb-2">
            <div
                className={`container card-background card-border column ${classes.container}`}>
                <div
                    className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>{OTPStatus ? t("SetTwoStepVerification.!title"): t("SetTwoStepVerification.title")}</h3>
                    </div>
                </div>
                <div className={`container ${classes.content} px-1 py-2`}>
                    {content()}
                </div>
            </div>
        </div>
    );
};

export default SetTwoStepVerification;


