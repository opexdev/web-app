import React from 'react';
import classes from './MarketView.module.css'
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";
import NullMarketStats from "../../../../../../../../components/NullMarketStats/NullMarketStats";
import MostIncreasedPrice from "./components/MostIncreasedPrice/MostIncreasedPrice";
import MostDecreasedPrice from "./components/MostDecreasedPrice/MostDecreasedPrice";
import MostVolume from "./components/MostVolume/MostVolume";
import {images} from "../../../../../../../../assets/images";

const MarketView = () => {

    const {t} = useTranslation();

    const interval = "24h"
    const {data: stats, isLoading, error} = useGetMarketStats(interval)
    const allSymbols = useSelector((state) => state.exchange.symbols)
    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if (!isLoading && mostVolume !== null && mostTrades !== null) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
    }


    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        if ( mostVolume === null && mostTrades === null) return <span className={`column height-100 py-5 jc-around ai-center`}>
            <img className={`img-lg-2`} src={images.pending} alt="pending"/>
            <NullMarketStats interval={"24h"}/>
        </span>
        else return <>
            <MostIncreasedPrice mostIncreasedPrice={mostIncreasedPrice}/>
            <MostDecreasedPrice mostDecreasedPrice={mostDecreasedPrice}/>
            <MostVolume mostVolume={mostVolume}/>
        </>
    }


    return (
        <div className={`${classes.container} card-bg card-border`}>
            <div className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
                <div className="row jc-center ai-center ">
                    <h3>{t("MarketView.title")}</h3>
                </div>
            </div>
            <div className={`column width-100 jc-center ${classes.content} px-2 py-1`}>
                {content()}
            </div>
        </div>
    );
};

export default MarketView;
