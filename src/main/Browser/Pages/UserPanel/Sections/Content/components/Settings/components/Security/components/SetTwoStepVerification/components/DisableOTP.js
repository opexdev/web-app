import React, {useState} from "react";
import classes from "../SetTwoStepVerification.module.css";
import {images} from "../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../components/Button/Button";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {requestForDeActiveOTP} from "js-api-client";

const DeActiveOTP = ({refetchOtp}) => {

    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const disableOTPHandler = () => {
        setIsLoading(true)
        requestForDeActiveOTP()
            .then(() => {
                refetchOtp()
                toast.error(t("SetTwoStepVerification.error"));
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="row width-100 jc-center ai-center height-100">
            <div className={`col-30 flex jc-center ai-center`}>
                <img src={images.security} alt="security" className={`img-lg-2`}/>
            </div>
            <div className={`col-70 column jc-center height-100`}>
                <span className={`mb-2`}>{t("SetTwoStepVerification.isActive")}</span>
                <Button
                    buttonClass={`${classes.thisButton} ${classes.disableOtp} mt-2`}
                    buttonTitle={isLoading ?
                        <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                             alt="linearLoading"/>
                        :
                        t("SetTwoStepVerification.deActive")}
                    onClick={disableOTPHandler}
                />
                {error ? <span className={`fs-0-7 text-red mt-1`}>
                    {t("SetTwoStepVerification.serverError")}
                </span> : ""}
            </div>
        </div>
    );
};

export default DeActiveOTP;