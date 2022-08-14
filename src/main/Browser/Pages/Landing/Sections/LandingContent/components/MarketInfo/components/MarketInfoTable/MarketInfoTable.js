import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import {useSelector} from "react-redux";
import {BN} from "../../../../../../../../../../utils/utils";

const MarketInfoTable = ({data}) => {

    const {t} = useTranslation();

    let head = (
        <div className="row text-color-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-30 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-25 flex jc-start ai-center">{t("MarketInfo.pcp24h")}</span>
            <span className="width-20 flex jc-start ai-center">{t("MarketInfo.volume")}</span>
            <span className="width-25 flex jc-end ai-center">{t("MarketInfo.chart")}</span>
        </div>
    );

    let body = (
        <>
         {data.map((tr, index) => {
            return (
                <div className={`${classes.row} row font-size-md rounded border-bottom cursor-pointer px-2 py-2`} key={index}>
                    <span className="width-25 row jc-start ai-center">
                        <img src={images[tr?.pairInfo?.baseAsset]} alt={tr?.pairInfo?.baseAsset}
                             title={tr?.pairInfo?.baseAsset} className={`img-lg ml-05`}/>
                        <span className={`font-size-md mr-05`}>{t("currency." + tr?.pairInfo?.baseAsset)}</span>
                    </span>
                    <span className={`width-30 flex jc-start ai-center ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{new BN(tr.lastPrice).toFormat()}</span>
                    <span className={`width-25 flex jc-end ai-center ${tr.priceChange > 0 ? "text-green" : "text-red"} direction-ltr`}>{new BN(tr.priceChange).toFormat()} %</span>
                    <span className="width-20 flex jc-start ai-center">{tr.volume}</span>
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
