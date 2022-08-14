import React from 'react';
import classes from './PriceInfo.module.css'
import {images} from "../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../components/Loading/Loading";
import {BN} from "../../../../../../../../utils/utils";
import Error from "../../../../../../../../components/Error/Error";

const PriceInfo = () => {

    const {t} = useTranslation();

    const interval = "24H"
    const {data:stats, isLoading, error} = useGetMarketStats(interval)

    const allSymbols = useSelector((state) => state.exchange.symbols)

    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    if(!isLoading) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol).replace("_",""))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol).replace("_",""))
    }


    return (
        <div className={`${classes.container} row jc-between ai-center col-100`}>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostIncreased")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    {isLoading ? <Loading/> : <>
                        {error ? <Error/> : <>
                            <img  src={images[mostIncreasedPrice.pairInfo.baseAsset]}
                                  alt={mostIncreasedPrice.pairInfo.baseAsset}
                                  title={mostIncreasedPrice.pairInfo.baseAsset}
                                  className={`img-md-plus`}/>
                            <span>{t("currency." + mostIncreasedPrice.pairInfo.baseAsset)}</span>
                            <div className={`row jc-center ai-center width-100 text-green`}>
                                <span className={`ml-025 font-size-sm-mini`}>{mostIncreasedPrice.pairInfo.quoteAsset}</span>
                                <span className={`mr-025 font-size-md`}>{new BN(mostIncreasedPrice?.lastPrice).toFormat()}</span>
                            </div>
                            <div className={`row jc-center ai-center width-100 text-green`}>
                                <span>% {new BN(mostIncreasedPrice?.priceChangePercent).toFormat(2)}+</span>
                            </div>
                        </>}
                    </>}
                </div>
            </div>
            <div className={`card-background card-border height-100 col-48`}>

                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostDecreased")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    {isLoading ? <Loading/> :
                    <>
                        {error ? <Error/> : <>
                                    <img src={images[mostDecreasedPrice.pairInfo.baseAsset]}
                                         alt={mostDecreasedPrice.pairInfo.baseAsset}
                                         title={mostDecreasedPrice.pairInfo.baseAsset}
                                         className={`img-md-plus`}/>
                                    <span>{t("currency." + mostDecreasedPrice.pairInfo.baseAsset)}</span>
                                    <div className={`row jc-center ai-center width-100 text-red`}>
                                        <span className={`ml-025 font-size-sm-mini`}>{mostDecreasedPrice.pairInfo.quoteAsset}</span>
                                        <span className={`mr-025 font-size-md`}>{new BN(mostDecreasedPrice?.lastPrice).toFormat()}</span>
                                    </div>
                                    <div className={`row jc-center ai-center width-100 text-red`}>
                                        <span className={`direction-ltr`}>{new BN(mostDecreasedPrice?.priceChangePercent).toFormat(2)} %</span>
                                    </div>
                                </>
                        }
                    </>
                    }
                </div>

            </div>
        </div>
    );
};

export default PriceInfo;
