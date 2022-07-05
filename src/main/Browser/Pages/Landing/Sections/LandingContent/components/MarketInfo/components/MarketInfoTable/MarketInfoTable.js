import React from 'react';
import classes from './MarketInfoTable.module.css'
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {images} from "../../../../../../../../../../assets/images";

const MarketInfoTable = (props) => {

    const {t} = useTranslation();
    const {data, baseAsset, price, lowPrice, highPrice, volume, priceChangePercent} = props


    return (

        <ScrollBar>
            <table className="text-center striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr className={``}>
                    <th className={`width-23 py-1`}>{t("MarketInfo.cryptocurrency")}</th>
                    <th>{t("MarketInfo.lastPrice")}</th>
                    <th>{t("MarketInfo.priceChangePercent")}</th>
                    <th>{t("min")}</th>
                    <th>{t("max")}</th>
                    <th>{t("MarketInfo.volume")}</th>
                    <th>{t("MarketInfo.chart")}</th>
                </tr>
                </thead>
                <tbody>
                {data.map((tr, index) => {

                    return (
                        <tr key={index}>
                            <td className={`row jc-between ai-center px-3 py-2`}>
                                <span className={`col-44 flex jc-end`}>
                                    <img
                                        className="img-md-plus "
                                        src={images[tr.baseAsset]}
                                        alt={tr.baseAsset}
                                        title={tr.baseAsset}
                                    />
                                </span>
                                <span className={`col-44 flex jc-start`}>
                                    <span className={``}>{t("currency." + tr.baseAsset)}</span>
                                </span>
                            </td>
                            <td className={tr.priceChangePercent > 0 ? "text-green" : "text-red"}>{tr.price}</td>
                            <td className={tr.priceChangePercent > 0 ? "text-green" : "text-red"}>{tr.priceChangePercent} %</td>
                            <td>{tr.lowPrice}</td>
                            <td>{tr.highPrice}</td>
                            <td>{tr.volume}</td>
                            <td className={``}><img
                                className="img-lg ml-05"
                                src={images.chart}
                                alt={tr.baseAsset}
                                title={tr.baseAsset}
                            /></td>
                        </tr>
                    )

                })}
                </tbody>
            </table>
        </ScrollBar>
    );
};

export default MarketInfoTable;
