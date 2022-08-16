import React from "react";
import classes from "./SetTwoStepVerification.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import ActivateOTP from "./components/ActivateOTP";
import DeActiveOTP from "./components/DisableOTP";
import {useGetUserOtpStatus} from "../../../../../../../../../../../../queries";

const SetTwoStepVerification = () => {

    const {t} = useTranslation();
    const username = useSelector(state => state.auth.username);
    const {data: otp, isLoading, error,refetch : refetchOtp} = useGetUserOtpStatus(username)

    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        return otp ? <DeActiveOTP refetchOtp={refetchOtp}/> : <ActivateOTP refetchOtp={refetchOtp}/>
    }

    return (
        <div className="container pb-2">
            <div className={`container card-background card-border column ${classes.container}`}>
                <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                    <div className="row jc-start ">
                        <h3>{otp ? t("SetTwoStepVerification.!title") : t("SetTwoStepVerification.title")}</h3>
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


