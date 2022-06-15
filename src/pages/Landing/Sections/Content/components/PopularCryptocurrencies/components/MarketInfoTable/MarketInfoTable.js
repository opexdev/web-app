import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";

const MarketInfoTable = () => {

    const {t} = useTranslation();

    let head = (
        <div className="row">
            <span className="width-20">{t("MarketInfo.name")}</span>
            <span className="width-20">{t("MarketInfo.lastPrice")}</span>
            <span className="width-10">{t("MarketInfo.priceChangePercent")}</span>
            <span className="width-15">{t("MarketInfo.volume")}</span>
            <span className="width-15">{t("MarketInfo.chart")}</span>
            <span className="width-10">{t("MarketInfo.details")}</span>
            <span className="width-10">{t("MarketInfo.trade")}</span>
        </div>
    );

    let body = (
        <div className="row">
            <span className="width-20 row jc-start ai-center">
                <img src={images.BTC} alt="" className={`img-md-plus ml-05`}/>
                <span className={`mr-05`}>{t("currency." + "BTC")}</span>
            </span>
            <span className="width-20">155254455554</span>
            <span className="width-10">20% +</span>
            <span className="width-15">1454545455</span>
            <span className="width-15">
                <img
                    className="img-lg-1"
                    src={images.chart}
                    alt={""}
                    title={""}
                />
            </span>
            <span className="width-10">{t("MarketInfo.details")}</span>
            <span className="width-10 rounded" style={{backgroundColor:"var(--cardHeaderAlpha)"}}>{t("MarketInfo.trade")}</span>
        </div>
    );


    return (
        <div className={`${classes.container} my-2`}>
            <div className={` ${classes.thead} text-color-gray mb-1`}>{head}</div>
            <div className={` ${classes.tbody} mt-1`}>{body}</div>
        </div>
    );
};

export default MarketInfoTable;
