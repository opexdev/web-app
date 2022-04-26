import React, {useState} from "react";
import classes from "../SetTwoStepVerification.module.css";
import {images} from "../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../components/Button/Button";
import Loading from "../../../../../../../../../../../components/Loading/Loading";
import TextInput from "../../../../../../../../../../../components/TextInput/TextInput";
import {parsePriceString} from "../../../../../../../../../../../utils/utils";
import QRCode from "react-qr-code";
import {requestActivateOTP, sendActivateOTP} from "../../../../../api/settings";
import {toast} from "react-hot-toast";
import {Trans, useTranslation} from "react-i18next";


const ActivateOTP = ({setOTP}) => {



    const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reqOTP, setReqOTP] = useState({
        "uri": "",
        "secret": "",
        "qr": ""
    });
    const [alert, setAlert] = useState([]);
    const [initialCode, setInitialCode] = useState("");


    const OTPInputHandler = (value) => {
        const userInput = value.replace(/[^0-9]+/g, "").slice(0,6)
        setInitialCode(userInput)
    }


    const submitButtonTextHandler = () => {
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange} alt="linearLoading"/>
        }
        return t("SetTwoStepVerification.active")
    }

    const sendReqActivateOTP = async () => {
        if (isLoading) return false
        setIsLoading(true)
        const reqActivateOTPData = await requestActivateOTP()
        if (reqActivateOTPData && reqActivateOTPData.status === 200) {
            setIsLoading(false)
            setError(false)
            setReqOTP(reqActivateOTPData.data)
        } else {
            setError(true)
            setIsLoading(false)
        }
    }
    const submitActivation = async (e) => {
        e.preventDefault();

        if (initialCode.toString().length === 6) {
            setAlert([])
            setLoading(true)
            const ActivateOTPReq = await sendActivateOTP(reqOTP.secret, initialCode);
            if (ActivateOTPReq && ActivateOTPReq.status === 204) {
                //setOTP(ActivateOTPReq.data)
                setLoading(false)
                setOTP(true)
                toast.success(<Trans
                    i18nKey="SetTwoStepVerification.success"
                />);

            } else {
                setAlert([t("SetTwoStepVerification.initialCodeError")])
                setLoading(false)
            }

        } else {
            setAlert([t("SetTwoStepVerification.initialCodeMin")])
        }



    }




    const content = () => {
        /*if (error) {
            return <Error/>
        }*/
        if (loading) {
            return <Loading/>
        }

        if (reqOTP.uri !== "") {
            return <div className={`row container jc-between ai-center height-100`}>
                <div className={`col-70 column jc-center`}>
                    <span className={`mb-2`}>{t("SetTwoStepVerification.QRdescription")}</span>
                    <form onSubmit={submitActivation} className={`row ai-start  mt-2`}>
                        <div className={`col-50`}>
                            <TextInput
                                lead={t("SetTwoStepVerification.code")}
                                value={initialCode}
                                alerts={alert}
                                customClass={classes.thisInput}
                                onchange={(e) => OTPInputHandler(e.target.value)}
                                type="text"
                                //max="6"
                            />
                        </div>
                        <Button
                            buttonClass={`${classes.thisButton} ${classes.submit} mr-1`}
                            buttonTitle={t("submit")}
                        />
                    </form>
                </div>
                <div className={`col-30 flex jc-center ai-center`}>
                    <QRCode
                        value={reqOTP.uri}
                        bgColor="var(--cardBody)"
                        fgColor="var(--textColor)"
                        level='L'
                        size={140}
                    />
                </div>
            </div>
        }
        return <div className={`column container jc-around ai-center height-100`}>

            <span>{t("SetTwoStepVerification.description")}</span>

            <div className={` container column jc-center ai-center`}>
                <Button
                    buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    buttonTitle={submitButtonTextHandler()}
                    //disabled={!(new BN(amount.value).minus(new BN(calculateFee(id))).isGreaterThan(0)) || address.value.length <= 0 }
                    onClick={sendReqActivateOTP}
                />
                <span className={`font-size-sm text-red mt-1`}>{error ? t("SetTwoStepVerification.serverError") : ""} </span>


            </div>



        </div>
    }


    return (content());
};


export default ActivateOTP;
