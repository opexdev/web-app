import React from 'react';
import classes from "./Guide.module.css";
import {useTranslation} from "react-i18next";

const Guide = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02 mb-1`}>{t("guide.subTitle1")}</span>
                <span className={`my-1`}>{t("guide.p1")}</span>
                <span className={`my-1`}>{t("guide.p2")}</span>
                <span className={`my-1`}>{t("guide.p3")}</span>
                <span className={`my-1`}>{t("guide.p4")}</span>
                <span className={`my-1`}>{t("guide.p5")}</span>
                <span className={`my-1`}>{t("guide.p6")}</span>
                <span className={`fs-02 text-orange mt-4`}>{t("guide.subTitle2")}</span>
                <div className={`column pr-2 my-2`}>
                    <span>{t("guide.p7")}</span>
                    <span>{t("guide.p8")}</span>
                    <span>{t("guide.p9")}</span>
                    <span>{t("guide.p10")}</span>
                </div>
            </div>
        </div>
    );
};

export default Guide;
