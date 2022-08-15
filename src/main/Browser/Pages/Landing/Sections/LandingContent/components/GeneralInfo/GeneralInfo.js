import React from 'react';
import classes from './GeneralInfo.module.css'
import {useGetExchangeInfo} from "../../../../../../../../queries";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import {useTranslation} from "react-i18next";

const GeneralInfo = () => {

    const {t} = useTranslation();

    const interval = "1Y"
    const {data, isLoading, error} = useGetExchangeInfo(interval)

    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        else return <>
            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>{data.activeUsers} +</span>
                <span className={`font-size-sm`}>{t("GeneralInfo.activeUsers")}</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>{data.totalOrders} +</span>
                <span className={`font-size-sm`}>{t("GeneralInfo.totalOrders")}</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>{data.totalTrades} +</span>
                <span className={`font-size-sm`}>{t("GeneralInfo.totalTrades")}</span>
            </div>
        </>
    }

    return (
        <div className={`${classes.container} row jc-between ai-center card-background card-border px-2 py-1`}>
            {content()}
        </div>
    );
};

export default GeneralInfo;
