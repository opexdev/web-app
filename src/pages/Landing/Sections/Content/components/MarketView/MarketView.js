import React from 'react';
import classes from './MarketView.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../assets/images";

const MarketView = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} card-background card-border`}>


            <div className={`column border-bottom jc-center card-header-bg ${classes.header}`}>
                <div className="row jc-center ai-center ">
                    <h3>{t("MarketView.title")}</h3>
                </div>
            </div>
            <div className={`column container jc-between ${classes.content} px-1 py-1`}>

                <div className={`column border-bottom`}>
                    <span className={`${classes.title} text-orange`}>{t("MarketView.mostIncrease")}</span>
                    <div className={`row jc-between ai-center`}>
                        <div className={`row jc-center ai-center`}>
                            <img src={images.BTC} alt="" className={`img-md-plus ml-05`}/>
                            <span className={`mr-05`}>{t("currency." + "BTC")}</span>
                        </div>
                        <div className={`column ai-end`}>
                            <span className={`text-green`}>25،1254،248</span>
                            <span className={`text-green`}>10% +</span>
                        </div>
                    </div>
                </div>

                <div className={`column border-bottom`}>
                    <span className={`${classes.title} text-orange`}>{t("MarketView.greatestReduction")}</span>
                    <div className={`row jc-between ai-center`}>
                        <div className={`row jc-center ai-center`}>
                            <img src={images.ETH} alt="" className={`img-md-plus ml-05`}/>
                            <span className={`mr-05`}>{t("currency." + "ETH")}</span>
                        </div>
                        <div className={`column ai-end`}>
                            <span className={`text-red`}>25،1254،248</span>
                            <span className={`text-red`}>10% -</span>
                        </div>
                    </div>
                </div>


                <div className={`column`}>
                    <span className={`${classes.title} text-orange`}>{t("MarketView.MaxTransactionVolume")}</span>
                    <div className={`row jc-between ai-center`}>
                        <div className={`row jc-center ai-center`}>
                            <img src={images.BTC} alt="" className={`img-md-plus ml-05`}/>
                            <span className={`mr-05`}>{t("currency." + "BTC")}</span>
                        </div>
                        <div className={`column ai-end`}>
                            <span className={`text-green`}>25،1254،248</span>
                            <span className={`text-green`}>10% +</span>
                        </div>
                    </div>
                </div>{/*
                <div className={`column border-bottom`}>
                    <span className={`${classes.title}`}>{t("MarketView.MinTransactionVolume")}</span>
                    <div className={`row jc-between ai-center`}>
                        <div className={`row jc-center ai-center`}>
                            <img src={images.BTC} alt="" className={`img-md-plus ml-05`}/>
                            <span className={`mr-05`}>{t("currency." + "BTC")}</span>
                        </div>
                        <div className={`column ai-end`}>
                            <span className={`text-green`}>25،1254،248</span>
                            <span className={`text-green`}>10% +</span>
                        </div>
                    </div>
                </div>*/}







            </div>


        </div>
    );
};

export default MarketView;
