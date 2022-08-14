import React from 'react';
import classes from './MarketView.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";
import {useGetMarketStats} from "../../../../../../../../queries";
import {BN} from "../../../../../../../../utils/utils";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";

const MarketView = () => {

    const {t} = useTranslation();


    const interval = "24H"
    const {data:stats, isLoading, error} = useGetMarketStats(interval)

    const allSymbols = useSelector((state) => state.exchange.symbols)

    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if(!isLoading) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol).replace("_",""))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
    }


    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        else return <>
            <div className={`column border-bottom`}>
                <span className={`${classes.title} text-orange`}>{t("MarketView.mostIncreased")}</span>
                <div className={`row jc-between ai-center`}>

                    <div className={`row jc-center ai-center`}>
                        <img
                            className="img-md-plus ml-05"
                            src={images[mostIncreasedPrice.pairInfo.baseAsset]}
                            alt={mostIncreasedPrice.pairInfo.baseAsset}
                            title={mostIncreasedPrice.pairInfo.baseAsset}
                        />
                        <span className={`mr-05`}>{t("currency." + mostIncreasedPrice.pairInfo.baseAsset)}</span>
                    </div>
                    <div className={`column ai-end text-green`}>
                        <div className={`row`}>
                            <span className={`font-size-sm-mini ml-05`}>{mostIncreasedPrice.pairInfo.quoteAsset}</span>
                            <span> {new BN(mostIncreasedPrice?.lastPrice).toFormat()} </span>
                        </div>
                        <span>% {new BN(mostIncreasedPrice?.priceChangePercent).toFormat(2)}+</span>
                    </div>
                </div>
            </div>
            <div className={`column border-bottom  my-3`}>
                <span className={`${classes.title} text-orange`}>{t("MarketView.mostDecreased")}</span>
                <div className={`row jc-between ai-center`}>
                    <div className={`row jc-center ai-center`}>
                        <img
                            className="img-md-plus ml-05"
                            src={images[mostDecreasedPrice.pairInfo.baseAsset]}
                            alt={mostDecreasedPrice.pairInfo.baseAsset}
                            title={mostDecreasedPrice.pairInfo.baseAsset}
                        />
                        <span className={`mr-05`}>{t("currency." + mostDecreasedPrice.pairInfo.baseAsset)}</span>
                    </div>
                    <div className={`column ai-end text-red`}>
                        <div className={`row`}>
                            <span className={`font-size-sm-mini ml-05`}>{mostDecreasedPrice.pairInfo.quoteAsset}</span>
                            <span> {new BN(mostDecreasedPrice?.lastPrice).toFormat()} </span>
                        </div>
                        <span className={`direction-ltr`}>{new BN(mostDecreasedPrice?.priceChangePercent).toFormat(2)} %</span>
                    </div>
                </div>
            </div>
            <div className={`column`}>
                <span className={`${classes.title} text-orange`}>{t("MarketView.mostVolume")}</span>
                <div className={`row jc-between ai-center`}>
                    <div className={`row jc-center ai-center`}>
                        <img
                            className="img-md-plus ml-05"
                            src={images[mostVolume.pairInfo.baseAsset]}
                            alt={mostVolume.pairInfo.baseAsset}
                            title={mostVolume.pairInfo.baseAsset}
                        />
                        <span className={`mr-05`}>{t("currency." + mostVolume.pairInfo.baseAsset)}</span>
                    </div>
                    <div className={`column ai-end`}>
                        <div className={`row`}>
                            <span className={`font-size-sm-mini ml-05`}>{mostVolume.pairInfo.quoteAsset}</span>
                            <span> {new BN(mostVolume?.volume).toFormat()} </span>
                        </div>
                        <span>% {new BN(mostVolume?.change).toFormat(2)}+</span>
                    </div>
                </div>
            </div>
        </>
    }


    return (
        <div className={`${classes.container} card-background card-border`}>
            <div className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
                <div className="row jc-center ai-center ">
                    <h3>{t("MarketView.title")}</h3>
                </div>
            </div>
            <div className={`column container jc-center ${classes.content} px-2 py-1`}>
                {content()}
            </div>
        </div>
    );
};

export default MarketView;
