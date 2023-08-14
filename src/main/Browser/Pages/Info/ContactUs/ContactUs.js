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
            </div>
        </div>
    );
};

export default ContactUs;
