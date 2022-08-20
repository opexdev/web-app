import React from 'react';
import classes from './VolumeInfo.module.css'
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import MostVolume from "./components/MostVolume/MostVolume";
import MostTrades from "./components/MostTrades/MostTrades";
import NullMarketStats from "../../../../../../../../components/NullMarketStats/NullMarketStats";


const VolumeInfo = () => {

    const {t} = useTranslation();

    const interval = useSelector((state) => state.global.marketInterval)
    const {data:stats, isLoading, error} = useGetMarketStats(interval)
    const allSymbols = useSelector((state) => state.exchange.symbols)
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if(!isLoading && mostVolume !== null && mostTrades !== null) {
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
    }

    const mostVolumeContent = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        if (mostVolume === null) return <NullMarketStats interval={interval}/>
        return <MostVolume mostVolume={mostVolume}/>
    }
    const mostTradesContent = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        if (mostTrades === null) return <NullMarketStats interval={interval}/>
        return <MostTrades mostTrades={mostTrades}/>
    }


    return (
        <div className={`${classes.container} row jc-between ai-center col-100`}>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostVolume")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2 px-1`}>
                    {mostVolumeContent()}
                </div>
            </div>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostTrades")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2 px-1`}>
                    {mostTradesContent()}
                </div>
            </div>
        </div>
    );
};

export default VolumeInfo;
