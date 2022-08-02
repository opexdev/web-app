import React, {useState} from "react";
import QRCode from "react-qr-code";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import classes from "../SetTwoStepVerification.module.css";
import {images} from "../../../../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../../../../components/Button/Button";
import Loading from "../../../../../../../../../../../../../components/Loading/Loading";
import TextInput from "../../../../../../../../../../../../../components/TextInput/TextInput";
import {requestForActivateOTP, sendInitialCodeToActivateOTP} from "js-api-client";

const ActivateOTP = ({refetchOtp}) => {
    const {t} = useTranslation();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reqOTP, setReqOTP] = useState();
    const [alert, setAlert] = useState([]);
    const [initialCode, setInitialCode] = useState("");

    const OTPInputHandler = (value) => {
        const userInput = value.replace(/[^0-9]+/g, "").slice(0, 6)
        setInitialCode(userInput)
    }

    const sendReqActivateOTP = () => {
        if (isLoading) return
        setError(false)
        setIsLoading(true)
        requestForActivateOTP()
            .then((res) => {
                setReqOTP(res.data)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const submitActivation = async (e) => {
        e.preventDefault();
        if (initialCode.length !== 6) {
            return setAlert([t("SetTwoStepVerification.initialCodeMin")])
        }
        setAlert([])
        setLoading(true)
        sendInitialCodeToActivateOTP(reqOTP.secret, initialCode)
            .then(() => {
                refetchOtp()
                toast.success(t("SetTwoStepVerification.success"));
            })
            .catch(() => {
                setAlert([t("SetTwoStepVerification.initialCodeError")])
            })
            .finally(() => {
                setLoading(false)
            });
    }

    if (loading) return <Loading/>

    if (reqOTP?.uri) {
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
                        />
                    </div>
                    <Button buttonClass={`${classes.thisButton} ${classes.submit} mr-1`} buttonTitle={t("submit")}/>
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
                buttonTitle={isLoading ? <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                              alt="linearLoading"/> : t("SetTwoStepVerification.active")}
                onClick={sendReqActivateOTP}
            />
            <span className={`font-size-sm text-red mt-1`}>
                {error ? t("SetTwoStepVerification.serverError") : ""}
            </span>
        </div>
    </div>
};

export default ActivateOTP;