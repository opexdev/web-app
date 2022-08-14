import React from 'react';
import classes from './VolumeInfo.module.css'
import {images} from "../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import {useSelector} from "react-redux";
import {BN} from "../../../../../../../../utils/utils";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";


const VolumeInfo = () => {

    const {t} = useTranslation();

    const interval = "24H"
    const {data:stats, isLoading, error} = useGetMarketStats(interval)

    const allSymbols = useSelector((state) => state.exchange.symbols)


    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if(!isLoading) {
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
    }


    return (
        <div className={`${classes.container} row jc-between ai-center col-100`}>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostVolume")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    {isLoading ? <Loading/> : <>
                        {error ? <Error/> : <>
                            <img src={images[mostVolume.pairInfo.baseAsset]}
                                 alt={mostVolume.pairInfo.baseAsset}
                                 title={mostVolume.pairInfo.baseAsset}
                                 className={`img-md-plus`}/>
                            <span>{t("currency." + mostVolume.pairInfo.baseAsset)}</span>
                            <div className={`row jc-center ai-center width-100 text-green`}>
                                <span className={`ml-025 font-size-sm-mini`}>{mostVolume.pairInfo.quoteAsset}</span>
                                <span className={`mr-025 font-size-md`}>{new BN(mostVolume?.volume).toFormat()} </span>
                            </div>
                            <div className={`row jc-center ai-center width-100 text-green`}>
                                <span>% {new BN(mostVolume?.change).toFormat(2)}+</span>
                            </div>
                        </>}
                    </>}
                </div>
            </div>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostTrades")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    {isLoading ? <Loading/> : <>
                        {error ? <Error/> : <>
                            <img src={images[mostTrades.pairInfo.baseAsset]}
                                 alt={mostTrades.pairInfo.baseAsset}
                                 title={mostTrades.pairInfo.baseAsset}
                                 className={`img-md-plus`}/>
                            <span>{t("currency." + mostTrades.pairInfo.baseAsset)}</span>
                            <div className={`row jc-center ai-center width-100 text-green`}>
                                <span className={`ml-025 font-size-sm-mini`}>{mostTrades.pairInfo.quoteAsset}</span>
                                <span className={`mr-025 font-size-md`}>{new BN(mostTrades?.tradeCount).toFormat()} </span>
                            </div>
                            {/*<div className={`row jc-center ai-center width-100 text-green`}>
                                <span>% {new BN(mostTrades?.change).toFormat(2)}+</span>
                            </div>*/}
                        </>}
                    </>}
                </div>
            </div>
        </div>
    );
};

export default VolumeInfo;
