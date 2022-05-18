import React, {useEffect, useState} from "react";
import classes from "./TheOrderBookTableSafari.module.css";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import {connect} from "react-redux";
import {BN} from "../../../../../../../../../../utils/utils";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import {
    setBestBuyPrice,
    setBestSellPrice,
    setBuyOrder,
    setSellOrder
} from "../../../../../../../../../../store/actions";
const TheOrderBookTableSafari = (props) => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState({buy: -1, sell: -1});
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


    if (props.type === "buy") {
        header = (
            <div className="row jc-between">
                <span className="width-50">{t("pricePerUnit")}</span>
                <span className="width-50">{t("volume")}</span>
            </div>
        );
    } else {
        header = (
            <div className="row jc-between">
                <span className="width-50">{t("volume")}</span>
                <span className="width-50">{t("pricePerUnit")}</span>
            </div>
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
                <div className="text-center" cellSpacing="0" cellPadding="0">
                    <div className={` ${classes.thead} `}>{header}</div>
                    <div className={` ${classes.tbody} `}>
                        {data.map((tr, index) => {
                            const pricePerUnit = new BN(tr[0])
                            const amount = new BN(tr[1])
                            const percent = amount.multipliedBy(100).dividedBy(totalAmount)

                            avg = {
                                pricePerUnit: pricePerUnit.plus(avg.pricePerUnit),
                                amount: amount.plus(avg.amount),
                            }
                            return type === "buy" ? (
                                <div
                                    key={index}
                                    style={backgroundBar(percent.toString())}
                                    className={`${selected.sell >= index ? "selected" : ""} cursor-pointer row jc-between ${classes.tbodyRow}`}
                                   >
                                    <span className="width-50">{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                                    <span className="width-50">{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    style={backgroundBar(percent.toString())}
                                    className={`${selected.buy >= index ? "selected" : ""} cursor-pointer row jc-between ${classes.tbodyRow}`}
                                   >
                                    <span className="width-50">{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                    <span className="width-50">{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TheOrderBookTableSafari);
