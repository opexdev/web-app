import React, {useEffect} from "react";
import classes from "./SendToAdminStep.module.css";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {images} from "../../../../../../../../../../../../assets/images";
import {setKYCStatusInitiate} from "../../../../../../../../../../../../store/actions";

const SendToAdminStep = ({prevStep}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const KYCStatus = useSelector(state => state.auth.kyc);
    const KYCReason = useSelector(state => state.auth.kycReason);

    useEffect(() => {
        dispatch(setKYCStatusInitiate());
    }, []);

    const content = () => {
        if (KYCStatus === "REQUESTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.pending} alt="kyc-pending"/>
                <span className={`mt-2`}>{t("SendToAdminStep.pending")}</span>
            </div>
        }
        if (KYCStatus === "ACCEPTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.approve} alt="kyc-accepted"/>
                <span className={`text-green mt-2`}>{t("SendToAdminStep.accepted")}</span>
            </div>
        }
        if (KYCStatus === "REJECTED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.reject} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToAdminStep.rejected")}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason === undefined ? t("SendToAdminStep.noData") : KYCReason}</span>

            </div>
        }
        if (KYCStatus === "BLOCKED") {
            return <div className={`column jc-center ai-center`}>
                <img className={`mb-2 floating`} src={images.block} alt="kyc-rejected"/>
                <span className={`text-red mt-2`}>{t("SendToAdminStep.blocked")}</span>
                <span className={`fs-0-8 mt-1`}>{t("SendToAdminStep.errorMessage")}: {KYCReason}</span>
            </div>
        }
    }

    return (
        <div className={`container card-bg card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg px-1 py-1 ${classes.header}`}>
                <div className="row jc-start ">
                    <h3>{t("SendToAdminStep.title")}</h3>
                </div>
            </div>
            <div className={`container column jc-between px-1 py-2 ${classes.content}`}>
                <span>{t("SendToAdminStep.content")}</span>
                <div className={`column`}>
                    {content()}
                </div>
                <div className="row pt-1 jc-end">
                    {KYCStatus === "REJECTED" && <Button
                        buttonClass={`${classes.thisButton} ${classes.prev}`}
                        onClick={prevStep}
                        buttonTitle={t("prevStep")}
                    />}
                </div>
            </div>
        </div>
    );
};

export default SendToAdminStep;
