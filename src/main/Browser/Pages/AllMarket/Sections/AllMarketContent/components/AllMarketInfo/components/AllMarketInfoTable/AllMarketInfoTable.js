import React from 'react';
import classes from './AllMarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../components/Button/Button";

const AllMarketInfTable = (props) => {


    const {t} = useTranslation();

    const {data, baseAsset, price, marketCap, lowPrice, highPrice, volume, priceChangePercent} = props

    let head = (
        <div className="row text-color-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-15 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-11 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-15 flex jc-start ai-center">{t("MarketInfo.marketCap")}</span>
            <span className="width-9 flex jc-start ai-center">{t("MarketInfo.pcp24h")}</span>
            <span className="width-9 flex jc-start ai-center">{t("MarketInfo.pcp7d")}</span>
            <span className="width-15 flex jc-start ai-center">{t("MarketInfo.volume")}</span>
            {/*<span className="width-10 flex jc-start ai-center">{t("MarketInfo.lowPrice")}</span>
            <span className="width-10 flex jc-start ai-center">{t("MarketInfo.highPrice")}</span>*/}
            <span className="width-10 flex jc-start ai-center">{t("MarketInfo.chart")}</span>{/*
            <span className="width-8 flex jc-center ai-center">{t("MarketInfo.details")}</span>
            <span className="width-8 flex jc-center ai-center">{t("MarketInfo.trade")}</span>*/}
        </div>
    );

    let body = (
        <>
            {data.map((tr, index) => {
                return (
                    <div className={`${classes.row} row rounded border-bottom px-2 py-2`}>
                         <span className="width-15 row jc-start ai-center">
                             <img src={images[tr.baseAsset]} alt={tr.baseAsset} title={tr.baseAsset} className={`img-md-plus ml-05`}/>
                                 <span className={`font-size-md mr-05`}>{t("currency." + tr.baseAsset)}</span>
                         </span>
                        <span className={`width-11 flex jc-start ai-center ${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.price}</span>
                        <span className="width-15 flex jc-start ai-center">{tr.marketCap}</span>
                        <span className={`width-9 flex jc-start ai-center ${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.pcp24h} %</span>
                        <span className={`width-9 flex jc-start ai-center ${tr.pcp7d > 0 ? "text-green" : "text-red"}`}>{tr.pcp7d} %</span>

                        <span className="width-15 flex jc-start ai-center">{tr.volume}</span>
                        {/*<span className="width-10 flex jc-start ai-center">{tr.lowPrice}</span>
                        <span className="width-10 flex jc-start ai-center">{tr.highPrice}</span>*/}

                        <span className="width-10 flex jc-start ai-center">
                            <img
                                className="img-lg-2"
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                        </span>

                        <span className="width-8 flex jc-end ai-center">
                            <Button
                                buttonClass={classes.thisButton}
                                type="button"
                                // onClick={() => navigate("/", { replace: true })}
                                buttonTitle={t("MarketInfo.details")}
                            />
                        </span>
                        <span className="width-8 flex jc-end ai-center">
                            <Button
                                buttonClass={classes.thisButton}
                                type="button"
                                // onClick={() => navigate("/", { replace: true })}
                                buttonTitle={t("MarketInfo.trade")}
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

export default AllMarketInfTable;
