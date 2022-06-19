import React from 'react';
import classes from './PriceInfo.module.css'
import {images} from "../../../../../../assets/images";
import {useTranslation} from "react-i18next";

const PriceInfo = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} row jc-between ai-center col-100`}>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.mostIncrease")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    <img src={images.BTC} alt="" className={`img-md-plus`}/>
                    <span className={``}>{t("currency." + "BTC")}</span>
                    <span className={`text-green`}>25،1254،248</span>
                    <span className={`text-green`}>10% +</span>
                </div>
            </div>
            <div className={`card-background card-border height-100 col-48`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center`}>
                    <span className={`text-orange`}>{t("MarketView.greatestReduction")}</span>
                </div>
                <div className={`${classes.content} column jc-around ai-center py-2`}>
                    <img src={images.ETH} alt="" className={`img-md-plus`}/>
                    <span className={``}>{t("currency." + "ETH")}</span>
                    <span className={`text-red`}>25،1254،248</span>
                    <span className={`text-red`}>10% -</span>
                </div>
            </div>
        </div>
    );
};

export default PriceInfo;
