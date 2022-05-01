import React, {useState} from "react";
import classes from "./SendToExpertStep.module.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {images} from "../../../../../../../../../../assets/images";
import {setKYCStatusInitiate} from "../../../../../../../../../../store/actions/auth";
import useInterval from "../../../../../../../../../../Hooks/useInterval";


const SendToExpertStep = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const KYCStatus = useSelector(state => state.auth.kyc);
    useInterval(() => {
        dispatch(setKYCStatusInitiate());
    }, 3000);

    const content = () => {
        if (KYCStatus === "REQUESTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2`} src={images.pending} alt="kyc-pending"/>
                <span className={`mt-2`}>{t("SendToExpertStep.pending")}</span>
            </div>
        }
        if (KYCStatus === "ACCEPTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2`} src={images.approve} alt="kyc-accepted"/>
                <span className={`text-green mt-2`}>{t("SendToExpertStep.accepted")}</span>
            </div>
        }
        if (KYCStatus === "REJECTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2`} src={images.reject} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToExpertStep.rejected")}</span>

            </div>
        }
        if (KYCStatus === "BLOCKED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2`} src={images.block} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToExpertStep.blocked")}</span>
            </div>
        }

    }


    return (
        <div
            className={`container card-background card-border column ${classes.container}`}>
            <div
                className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("SendToExpertStep.title")}</h3>
                </div>
            </div>
            <div
                className={`container column jc-between px-1 py-2 ${classes.content}`}>
                <span>{t("SendToExpertStep.content")}</span>
                <div className={`column`}>
                    {content()}
                </div>
                <div className="row pt-1 jc-end">
                    {KYCStatus === "REJECTED" && <Button
                        buttonClass={`${classes.thisButton} ${classes.prev}`}
                        onClick={props.prevStep}
                        buttonTitle={t("prevStep")}
                    />}
                </div>
            </div>
        </div>
    );
};

export default SendToExpertStep;
