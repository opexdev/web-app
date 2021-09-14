import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import Icon from "../../../../../../components/Icon/Icon";
import classes from "../../MyOrders.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import {cancelOpenOrders, getOpenOrder} from "../api/myOrders";
import {connect} from "react-redux";
import {BN} from "../../../../../../utils/utils";
import Loading from "../../../../../../components/Loading/Loading";

const OpenOrders = (props) => {

    const {activePair, accessToken, lastTransaction} = props

    const {t} = useTranslation();
    const [orders, setOrders] = useState([])
    const [openOrder, setOpenOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getOpenOrderData = async () => {
        const openOrder = await getOpenOrder(activePair, accessToken)
        if (openOrder.status === 200) {
            setOrders(openOrder.data)
        }
    }

    useEffect(async () => {
        getOpenOrderData().then(()=>setIsLoading(false))
    }, [activePair, lastTransaction])

    const cancelOrder = async (orderId) => {
        await cancelOpenOrders(activePair, accessToken, orderId)
        await getOpenOrderData()
    }
    if (isLoading) {
        return <Loading/>
    }
    return (
        <ScrollBar>
            <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr>
                    <th>{t("date")}</th>
                    <th>{t("time")}</th>
                    <th>
                        {t("volume")}({activePair.base})
                    </th>
                    <th>
                        {t("pricePerUnit")}({activePair.quote})
                    </th>
                    <th>{t("totalPrice")}</th>
                    <th>{t("myOrders.donePercentage")}</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {orders.sort((a, b) => a.time - b.time).map((tr, index) => {
                        const origQty = new BN(tr.origQty)
                        const executedQty = new BN(tr.executedQty)
                        const pricePerUnit = new BN(tr.price)
                        const totalPrice = pricePerUnit.multipliedBy(origQty)

                        return (<Fragment key={index}>
                            <tr className={tr.side === "BUY" ? "text-green" : "text-red"}>
                                <td>{moment(tr.time).format("jYY/jMM/jDD")}</td>
                                <td>{moment(tr.time).format("HH:mm:ss")}</td>
                                <td>{origQty.decimalPlaces(activePair.baseMaxDecimal).toFormat()}</td>
                                <td>{pricePerUnit.decimalPlaces(activePair.quoteMaxDecimal).toFormat()}</td>
                                <td>{totalPrice.decimalPlaces(activePair.quoteMaxDecimal).toFormat()}</td>
                                <td>{executedQty.dividedBy(origQty).multipliedBy(100).toFormat(0)}</td>
                                <td
                                    onClick={() => cancelOrder(tr.orderId)}
                                    data-html={true}
                                    data-place="bottom"
                                    data-effect="float"
                                    data-tip={t("myOrders.cancelOrder")}
                                >
                                    <Icon
                                        iconName="icon-cancel text-red font-size-sm"
                                        customClass={`${classes.iconBG} cursor-pointer`}
                                    />
                                </td>
                                {openOrder === index ? (
                                    <td onClick={() => setOpenOrder(null)}>
                                        <Icon
                                            iconName="icon-up-open icon-blue font-size-sm"
                                            customClass={`${classes.iconBG} cursor-pointer`}
                                        />
                                    </td>
                                ) : (
                                    <td onClick={() => setOpenOrder(index)}>
                                        <Icon
                                            iconName="icon-down-open icon-blue font-size-sm"
                                            customClass={`${classes.iconBG} cursor-pointer`}
                                        />
                                    </td>
                                )}
                            </tr>
                            <tr style={{display: openOrder === index ? "revert" : "none"}}>
                                <td colSpan="8" className={`py-1 px-2`}>
                                    <div
                                        className="row jc-around  ai-center"
                                        style={{width: "100%"}}>
                                        <p className="col-46 row jc-between">
                                            {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                        </p>
                                        <p className="col-46 row jc-between">
                                            {t("myOrders.tradedAmount")} :{" "}
                                            <span>{executedQty.decimalPlaces(activePair.baseMaxDecimal).toFormat()}</span>
                                        </p>
                                    </div>
                                    <div
                                        className="row jc-around  ai-center"
                                        style={{width: "100%"}}>
                                        <p className="col-46 row jc-between">
                                            {t("myOrders.avgTradedAmount")} :{" "}
                                            <span>-</span>
                                        </p>
                                        <p className="col-46 row jc-between">
                                            {t("myOrders.tradedPrice")} :{" "}
                                            <span>{executedQty.multipliedBy(pricePerUnit).decimalPlaces(activePair.baseMaxDecimal).toFormat()}</span>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </Fragment>)
                    }
                )}
                </tbody>
            </table>
        </ScrollBar>
    )
}


const mapStateToProps = (state) => {
    return {
        activePair: state.global.activePair,
        accessToken: state.auth.accessToken,
        lastTransaction: state.auth.lastTransaction,
    };
};

export default connect(mapStateToProps, null)(OpenOrders);