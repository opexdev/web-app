import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrders.module.css";
import {useTranslation} from "react-i18next";
import {getOrdersHistory} from "../api/myOrders";
import {connect} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../../../components/Icon/Icon";

const OrdersHistory = (props) => {

    const {activePair , lastTransaction} = props

    const {t} = useTranslation();
    const [orders, setOrders] = useState([])
    const [openOrder, setOpenOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getOrdersHistory(activePair)
            .then((ordersHistory) => {
                if (ordersHistory.status === 200) {
                    setOrders(ordersHistory.data.sort((a,b) => moment(b.time).unix() - moment(a.time).unix()).slice(0 , 50))



                    
                }
                setIsLoading(false)
            })
    }, [activePair, lastTransaction])

    if (isLoading) {
        return <Loading/>
    }

    if (orders.length === 0) {
        return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>
    }

    return (
        <ScrollBar>
            <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr>
                    <th>{t("date")}</th>
                    <th>{t("time")}</th>
                    <th>
                        {t("volume")}({activePair.baseAsset})
                    </th>
                    <th>
                        {t("pricePerUnit")}({activePair.quoteAsset})
                    </th>
                    <th>{t("totalPrice")}</th>
                    <th>{t("status")}</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {orders.map((tr, index) => (
                    <Fragment key={index}>
                        <tr className={tr.side === "BUY" ? "text-green" : "text-red"}>
                            <td>{moment(tr.time).format("jYY/jMM/jDD")}</td>
                            <td>{moment(tr.time).format("HH:mm:ss")}</td>
                            <td>{tr.origQty}</td>
                            <td>{tr.price.toLocaleString()}</td>
                            <td>{(tr.origQty * tr.price).toLocaleString()}</td>
                            <td>{t("ordersStatus." + tr.status)}</td>
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
                        <tr style={{
                            display: openOrder === index ? "revert" : "none",
                        }}>
                            <td colSpan="8" className={`py-1 px-2`}>
                                <div
                                    className="row jc-between  ai-center"
                                    style={{width: "100%", textAlign: "start"}}>
                                    <p className="col-46 row jc-between">
                                        {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                    </p>
                                    <p className="col-46 row jc-between">
                                        {t("orderType")} :{" "}
                                        <span>
                                            {t(tr.side) + " " + t("orderTypes." + tr.type)}
                                        </span>
                                    </p>
                                </div>
                                <div className="row  jc-between ai-center"
                                     style={{width: "100%", textAlign: "start"}}>
                                    <p className="col-46 row jc-between">
                                        {t("myOrders.stopOrderTime")} :{" "}
                                        <span>
                                            {moment(tr.updateTime).format("jYY/jMM/jDD HH:mm:ss",)}
                                        </span>
                                    </p>
                                    <p className="col-46 row jc-between">
                                        {t("myOrders.startOrderTime")} :{" "}
                                        <span>
                                            {moment(tr.time).format("jYY/jMM/jDD HH:mm:ss",)}
                                        </span>
                                    </p>
                                </div>
                                {/*<div className="row jc-between ai-center" style={{width: "100%", textAlign: "start"}}>
                                    <p className="col-46 row jc-between">
                                        {t("myOrders.stoppedPrice")} :{" "}
                                        <span>{tr.price}</span>
                                    </p>
                                </div>*/}
                            </td>
                        </tr>
                    </Fragment>
                ))}
                </tbody>
            </table>
        </ScrollBar>
    )
}


const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
        lastTransaction: state.auth.lastTransaction,
    };
};

export default connect(mapStateToProps, null)(OrdersHistory);