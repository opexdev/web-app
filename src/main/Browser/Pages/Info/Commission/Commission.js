import React from 'react';
import classes from './Commission.module.css'
import {useTranslation} from "react-i18next";

const Commission = () => {
    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02`}>{t("commissions.subTitle1")}</span>
                <span className={`my-1`}>{t("commissions.text1")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("commissions.p1")}</span>
                    <span>{t("commissions.p2")}</span>
                    <span>{t("commissions.p3")}</span>
                    <span>{t("commissions.p4")}</span>
                </div>
                <span>{t("commissions.p5")}</span>
                <span>{t("commissions.p6")}</span>
                <span className={`mt-2`}>{t("commissions.text2")}</span>
                <span className={`mt-2`}>{t("commissions.text3")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("commissions.p7")}</span>
                    <span>{t("commissions.p8")}</span>
                    <span>{t("commissions.p9")}</span>
                </div>
                <span className={`mt-2`}>{t("commissions.text4")}</span>
            </div>
        </div>
    );
};

export default Commission;
