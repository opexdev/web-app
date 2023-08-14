import React from 'react';
import classes from './TransferFees.module.css'
import {useTranslation} from "react-i18next";

const TransferFees = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-90 m-auto py-5`}>
            <div className={`card-bg card-border column px-2 py-3 `}>
                <span className={`fs-02`}>{t("transferFees.text1")}</span>
                <div className={`column pr-2 my-2 text-blue`}>
                    <span>{t("transferFees.p1")}</span>
                    <span>{t("transferFees.p2")}</span>
                    <span>{t("transferFees.p3")}</span>
                    <span>{t("transferFees.p4")}</span>
                    <span>{t("transferFees.p5")}</span>
                </div>
                <span className={`my-1`}>{t("transferFees.text2")}</span>
                <span className={`my-1`}>{t("transferFees.text3")}</span>
                <span className={`my-1`}>{t("transferFees.text4")}</span>




                <span className={`fs-02 text-orange mt-4`}>{t("transferFees.subTitle1")}</span>
                <span className={`mt-2`}>{t("transferFees.text5")}</span>

                <span className={`fs-02 text-orange mt-4`}>{t("transferFees.subTitle2")}</span>
                <span className={`mt-2`}>{t("transferFees.text6")}</span>

                <span className={`fs-02 text-orange mt-4`}>{t("transferFees.subTitle3")}</span>
                <span className={`mt-2`}>{t("transferFees.text7")}</span>

                <span className={`fs-02 text-orange mt-4`}>{t("transferFees.subTitle4")}</span>
                <span className={`mt-2`}>{t("transferFees.text8")}</span>

            </div>
        </div>
    );
};

export default TransferFees;
