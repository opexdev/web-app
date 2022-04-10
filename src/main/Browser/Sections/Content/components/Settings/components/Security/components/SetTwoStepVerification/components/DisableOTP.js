import React, {useState} from "react";
import classes from "../SetTwoStepVerification.module.css";
import {images} from "../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../components/Button/Button";
import {sendDisableOTP} from "../../../../../api/settings";
import {toast} from "react-hot-toast";
import {Trans, useTranslation} from "react-i18next";


const DisableOTP = ({setOTP}) => {

    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);


    const disableOTPHandler = async () => {
        setIsLoading(true)
        const disableOTPReq = await sendDisableOTP()
        if (disableOTPReq && disableOTPReq.status === 204) {
            setIsLoading(false)
            setOTP(false)
            toast.error(<Trans
                i18nKey="SetTwoStepVerification.error"
            />);
        } else {
            setError(true)
            setIsLoading(false)
        }
    }

    const submitButtonTextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        return t("SetTwoStepVerification.deActive")
    }


    return (
        <div className={`row container jc-center ai-center height-100`}>

            <div className={`col-30 flex jc-center ai-center`}>
                <img src={images.security} alt="security" className={`img-lg-2`}/>
            </div>
            <div className={`col-70 column jc-center height-100`}>
                <span className={`mb-2`}>{t("SetTwoStepVerification.isActive")}</span>
                <Button
                    buttonClass={`${classes.thisButton} ${classes.disableOtp} mt-2`}

                    buttonTitle={submitButtonTextHandler()}

                    //buttonTitle={t("submit")}
                    onClick={disableOTPHandler}
                />
                {error ? <span className={`font-size-sm text-red mt-1`}>{t("SetTwoStepVerification.serverError")}</span> : ""}
            </div>

        </div>
    );
};


export default DisableOTP;
