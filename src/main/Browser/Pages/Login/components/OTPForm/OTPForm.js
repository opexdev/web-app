import classes from "../../Login.module.css";
import React from "react";
import TextInput from "../../../../../../components/TextInput/TextInput";
import {useTranslation} from "react-i18next";


const OTPForm = ({initialVal , setOTP}) => {
    const {t} = useTranslation();


    const OTPInputHandler = (value) => {
        const userInput = value.replace(/[^0-9]+/g, "").slice(0,6)
        setOTP(userInput)
    }





    return (
        <>
            <TextInput
                lead={t('otp')}
                type="text"
                customClass={`${classes.loginInput } ${classes.otpInput} my-2`}
                value={initialVal}
                onchange={(e) => OTPInputHandler(e.target.value)}
            />
        </>
    )
}



export default OTPForm;