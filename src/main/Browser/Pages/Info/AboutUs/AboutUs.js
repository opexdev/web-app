import React from 'react';
import classes from "./AboutUs.module.css";
import {useTranslation} from "react-i18next";

const AboutUs = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02`}>{t("aboutUs.text1")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("aboutUs.p1")}</span>
                    <span>{t("aboutUs.p2")}</span>
                    <span>{t("aboutUs.p3")}</span>
                    <span>{t("aboutUs.p4")}</span>
                </div>
                <span>{t("aboutUs.text2")}</span>
                <span className={`fs-02 text-orange mt-4`}>{t("aboutUs.subTitle1")}</span>
                <span className={`mt-2`}>{t("aboutUs.text3")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("aboutUs.p5")}</span>
                    <span>{t("aboutUs.p6")}</span>
                    <span>{t("aboutUs.p7")}</span>
                    <span>{t("aboutUs.p8")}</span>
                    <span>{t("aboutUs.p9")}</span>
                    <span>{t("aboutUs.p10")}</span>
                </div>
                <span className={`fs-02 text-orange mt-4`}>{t("aboutUs.subTitle2")}</span>
                <span className={`mt-2`}>{t("aboutUs.text4")}</span>
                <span className={`fs-02 text-orange mt-4`}>{t("aboutUs.subTitle3")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("aboutUs.p11")}</span>
                    <span>{t("aboutUs.p12")}</span>
                    <span>{t("aboutUs.p13")}</span>
                </div>
                <span className={`mt-2`}>{t("aboutUs.text5")}</span>
            </div>
        </div>
    );
};

export default AboutUs;
