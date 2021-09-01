import React, {useEffect, useState} from "react";
import classes from "./OrderBookTable.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import {connect} from "react-redux";
import {
    setBestBuyPrice,
    setBestSellPrice,
    setBuyOrder,
    setSellOrder,
} from "../../../../../../store/actions";

const OrderBookTable = (props) => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState({buy: -1, sell: -1});

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    let header;
    let totalAmount = props.data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);
    let avg = {pricePerUnit: 0, amount: 0, total: 0};
    let start = "right";
    let end = "left";

    if (i18n.language === "en") {
        start = "left";
        end = "right";
    }

    if (props.type === "buy") {
        header = (
            <tr>
                <th>{t("pricePerUnit")}</th>
                <th>{t("volume")}</th>
                <th>{t("totalPrice")}</th>
            </tr>
        );
    } else {
        header = (
            <tr>
                <th>{t("totalPrice")}</th>
                <th>{t("volume")}</th>
                <th>{t("pricePerUnit")}</th>
            </tr>
        );
    }
    useEffect(() => {
        if (props.data.length > 0) {
            totalAmount = props.data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);

            props.type === "buy"
                ? props.setBestSellPrice(props.data[0].pricePerUnit)
                : props.setBestBuyPrice(props.data[0].pricePerUnit);
        }

    }, [props.data]);

    const backgroundBar = (percent) => {
        if (props.type === "buy") {
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
                    {props.data.map((tr, index) => {
                        tr["percent"] = ((parseFloat(tr[1]) / totalAmount) * 100).toFixed();
                        tr["pricePerUnit"] = tr[0];
                        tr["amount"] = tr[1];
                        tr["totalPrice"] = tr[1] * tr[0];
                        return props.type === "buy" ? (
                            <tr
                                key={index}
                                style={backgroundBar(tr["percent"])}
                                onMouseEnter={() => setSelected({...selected, sell: index})}
                                onMouseLeave={() => setSelected({...selected, sell: -1})}
                                data-html={true}
                                className={`${
                                    selected.sell >= index ? "selected" : ""
                                } cursor-pointer`}
                                data-place="bottom"
                                data-effect="float"
                                data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "averagePrice",
                                )}:</span>
                                                    <span >${(
                                    (avg.pricePerUnit =
                                        avg.pricePerUnit +
                                        tr["pricePerUnit"]) /
                                    (index + 1)
                                )
                                    .toFixed(
                                        props.activePair
                                            .quoteMaxDecimal,
                                    )
                                    .toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "totalVolume",
                                )}:</span>
                                                    <span >${(avg.amount =
                                    avg.amount + tr["amount"])
                                    .toFixed(
                                        props.activePair
                                            .baseMaxDecimal,
                                    )
                                    .toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "totalPrice",
                                )}:</span>
                                                    <span >${(avg.total =
                                    avg.total +
                                    tr[
                                        "totalPrice"
                                        ]).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        `}
                                data-amount={avg.amount}
                                onClick={(e) =>
                                    props.onSetSellOrder({
                                        pricePerUnit: tr["pricePerUnit"],
                                        amount: parseFloat(
                                            e.currentTarget.getAttribute("data-amount"),
                                        ),
                                    })
                                }>
                                <td>{tr["pricePerUnit"]}</td>
                                <td>{tr["amount"]}</td>
                                <td>{tr["totalPrice"]}</td>
                            </tr>
                        ) : (
                            <tr
                                key={index}
                                style={backgroundBar(tr["percent"])}
                                onMouseEnter={() => setSelected({...selected, buy: index})}
                                onMouseLeave={() => setSelected({...selected, buy: -1})}
                                data-html={true}
                                className={`${
                                    selected.buy >= index ? "selected" : ""
                                } cursor-pointer `}
                                data-place="bottom"
                                data-effect="float"
                                data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "averagePrice",
                                )}:</span>
                                                    <span >${(
                                    (avg.pricePerUnit =
                                        avg.pricePerUnit +
                                        tr["pricePerUnit"]) /
                                    (index + 1)
                                )
                                    .toFixed(
                                        props.activePair
                                            .quoteMaxDecimal,
                                    )
                                    .toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "totalVolume",
                                )}:</span>
                                                    <span >${(avg.amount =
                                    avg.amount + tr["amount"])
                                    .toFixed(
                                        props.activePair
                                            .baseMaxDecimal,
                                    )
                                    .toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t(
                                    "totalPrice",
                                )}:</span>
                                                    <span >${(avg.total =
                                    avg.total +
                                    tr[
                                        "totalPrice"
                                        ]).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        `}
                                data-amount={avg.amount}
                                onClick={(e) =>
                                    props.onSetBuyOrder({
                                        pricePerUnit: tr["pricePerUnit"],
                                        amount: parseFloat(
                                            e.currentTarget.getAttribute("data-amount"),
                                        ),
                                    })
                                }>
                                <td>
                                    {tr["totalPrice"]}
                                </td>
                                <td>{tr["amount"]}</td>
                                <td>
                                    {tr["pricePerUnit"]}
                                </td>
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
        activePair: state.global.activePair,
        activePairOrders: state.global.activePairOrders,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookTable);
