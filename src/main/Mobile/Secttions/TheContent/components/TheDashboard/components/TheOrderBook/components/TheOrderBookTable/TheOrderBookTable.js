import React, {useEffect, useState} from "react";
import classes from "./TheOrderBookTable.module.css";
import {
    setBestBuyPrice,
    setBestSellPrice,
    setBuyOrder,
    setSellOrder
} from "../../../../../../../../../../store/actions";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";


const TheOrderBookTable = (props) => {

    const {t} = useTranslation();
    const {activePair,data,type,onSetBuyOrder,onSetSellOrder,setBestSellPrice,setBestBuyPrice} = props

    let header;

    let totalAmount = data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);
    let avg = {pricePerUnit: new BN(0), amount: new BN(0), total: new BN(0)};
    let start = "right";
    let end = "left";

    if (i18n.language === "en") {
        start = "left";
        end = "right";
    }

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    if (type === "buy") {
        header = (
            <tr>
                <th>{t("pricePerUnit")}</th>
                <th>{t("volume")}</th>
            </tr>
        );
    } else {
        header = (
            <tr>
                <th>{t("volume")}</th>
                <th>{t("pricePerUnit")}</th>
            </tr>
        );
    }
    useEffect(() => {
        if (data.length > 0) {
            totalAmount = data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);
            type === "buy"
                ? setBestSellPrice(data[0][0])
                : setBestBuyPrice(data[0][0]);
        }
    }, [data]);

    const backgroundBar = (percent) => {
        if (type === "buy") {
            return {
                background: `linear-gradient(to ${end}, var(--textGreenAlpha) ${percent}%, transparent ${percent}%) no-repeat`,
            };
        }
        return {
            background: `linear-gradient(to ${start}, var(--textRedAlpha) ${percent}%, transparent ${percent}%) no-repeat`,
        };
    }


    return (
        <div className={`column container ${classes.container}`}>

            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    <thead>{header}</thead>
                    <tbody>
                    {data.map((tr, index) => {
                        const pricePerUnit = new BN(tr[0])
                        const amount = new BN(tr[1])
                        const percent = amount.multipliedBy(100).dividedBy(totalAmount)


                        avg = {
                            pricePerUnit: pricePerUnit.plus(avg.pricePerUnit),
                            amount: amount.plus(avg.amount),

                        }
                        return type === "buy" ? (
                            <tr
                                key={index}
                                style={backgroundBar(percent.toString())}
                                >
                                <td>{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</td>
                                <td>{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</td>
                            </tr>
                        ) : (
                            <tr
                                key={index}
                                style={backgroundBar(percent.toString())}
                                >
                                <td>{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</td>
                                <td>{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</td>
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
        activePairOrders: state.exchange.activePairOrders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetBuyOrder: (selected) => dispatch(setBuyOrder(selected)),
        onSetSellOrder: (selected) => dispatch(setSellOrder(selected)),
        setBestSellPrice: (bestSellPrice) => dispatch(setBestSellPrice(bestSellPrice)),
        setBestBuyPrice: (bestBuyPrice) => dispatch(setBestBuyPrice(bestBuyPrice)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheOrderBookTable);
