import React from 'react';
import classes from './GeneralInfo.module.css'
import {useGetExchangeInfo} from "../../../../../../queries";
import Loading from "../../../../../../components/Loading/Loading";
import Error from "../../../../../../components/Error/Error";
import {useTranslation} from "react-i18next";

const GeneralInfo = () => {

    const {t} = useTranslation();

    const interval = "1Y"
    const {data, isLoading, error} = useGetExchangeInfo(interval)

    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <span className={`width-100`}><Error/></span>
        else return <>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data.activeUsers.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.activeUsers")}</span>
            </div>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data.totalOrders.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalOrders")}</span>
            </div>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data.totalTrades.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalTrades")}</span>
            </div>
        </>
    }

    return (
        <div className={`${classes.container} row jc-between ai-center card-bg card-border px-05 py-1`}>
            {content()}
        </div>
    );
};

export default GeneralInfo;
