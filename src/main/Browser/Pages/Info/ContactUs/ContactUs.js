import React from 'react';
import classes from './ContactUs.module.css';
import {useTranslation} from "react-i18next";

const ContactUs = () => {
    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02 mb-1`}>{t("contactUs.subTitle1")}</span>
                <span className={`my-1`}>{t("contactUs.text1")}</span>

                <div className={`row mt-2`}>
                    <span className={` ml-1`}>{t("contactUs.businessEmails")}: </span>
                    <span className={`fs-01 mr-1`}>{t("contactUs.businessEmailsValue")}</span>
                </div>
                <div className={`row mt-2`}>

                    <span className={` ml-1`}>{t("contactUs.supportRelated")}: </span>
                    <span className={`fs-01 mr-1`}>{t("contactUs.supportRelatedValue")}</span>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
