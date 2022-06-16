import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";

const MarketInfoTable = (props) => {

    const {t} = useTranslation();

    const {data, baseAsset, price, marketCap, lowPrice, highPrice, volume, priceChangePercent} = props

    let head = (
        <div className="row text-color-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-30 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.priceChangePercent")}</span>
            <span className="width-20 flex jc-start ai-center">{t("MarketInfo.marketCap")}</span>
            <span className="width-25 flex jc-end ai-center">{t("MarketInfo.chart")}</span>
        </div>
    );

    let body = (
        <>
         {data.map((tr, index) => {
            return (
        <div className={`${classes.row} row rounded border-bottom cursor-pointer px-2 py-2`}>
            <span className="width-25 row jc-start ai-center">
                <img src={images[tr.baseAsset]} alt={tr.baseAsset}
                     title={tr.baseAsset} className={`img-md-plus ml-05`}/>
                <span className={`mr-05`}>{t("currency." + tr.baseAsset)}</span>
            </span>
            <span className={`width-30 flex jc-start ai-center ${tr.priceChangePercent > 0 ? "text-green" : "text-red"}`}>{tr.price}</span>
            <span className={`width-25 flex jc-start ai-center ${tr.priceChangePercent > 0 ? "text-green" : "text-red"}`}>{tr.priceChangePercent} %</span>
            <span className="width-20 flex jc-start ai-center">{tr.marketCap}</span>
            <span className="width-25 flex jc-end ai-center">
                <img
                    className="img-lg-2"
                    src={images.chart}
                    alt={""}
                    title={""}
                />
            </span>
        </div>
            )
        })}
        </>
    );


    return (
        <>
            {head}
            {body}
        </>
    );
};

export default MarketInfoTable;
