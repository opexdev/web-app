import React from 'react';
import classes from './Rules.module.css'
import {useTranslation} from "react-i18next";

const Rules = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02 mb-1`}>{t("rules.subTitle1")}</span>
                <span className={`my-1`}>{t("rules.p1")}</span>
                <span className={`my-1`}>{t("rules.p2")}</span>
                <span className={`my-1`}>{t("rules.p3")}</span>
                <span className={`my-1`}>{t("rules.p4")}</span>
                <span className={`my-1`}>{t("rules.p5")}</span>
                <span className={`my-1`}>{t("rules.p6")}</span>
                <span className={`fs-02 text-orange mt-4`}>{t("rules.subTitle2")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("rules.p7")}</span>
                    <span>{t("rules.p8")}</span>
                    <span>{t("rules.p9")}</span>
                    <span>{t("rules.p10")}</span>
                </div>
            </div>
        </div>
    );
};

export default Rules;
