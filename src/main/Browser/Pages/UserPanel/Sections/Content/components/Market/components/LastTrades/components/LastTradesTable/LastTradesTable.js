import React from "react";
import classes from "./LastTradesTable.module.css";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {connect} from "react-redux";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import {BN} from "../../../../../../../../../../../../utils/utils";
import Date from "../../../../../../../../../../../../components/Date/Date";

const LastTradesTable = (props) => {
    const {t} = useTranslation();
    const {activePair, data} = props

    return (
        <div className={`column width-100 ${classes.container}`}>
            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    <thead>
                    <tr>
                        <th>{t("date")}</th>
                        <th>{t("time")}</th>
                        <th>
                            {t("volume")}({activePair.baseAsset})
                        </th>
                        <th>
                            {t("price")}({activePair.quoteAsset})
                        </th>
                        <th>{t("totalPrice")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((tr, index) => {
                        const pricePerUnit = new BN(tr.price)
                        const amount = new BN(tr.qty)
                        const totalPrice = pricePerUnit.multipliedBy(amount)

                        return (
                            <tr key={index} style={{color: tr.isBuyerMaker === true ? "var(--green)" : "var(--red)",}}>
                                <td><Date date={tr.time}/></td>
                                <td>{moment(tr.time).format("HH:mm:ss")}</td>
                                <td>{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</td>
                                <td>{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</td>
                                <td>{totalPrice.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </ScrollBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
    };
};

export default connect(mapStateToProps, null)(LastTradesTable);
