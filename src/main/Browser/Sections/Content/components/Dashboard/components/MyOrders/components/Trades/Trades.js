import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrders.module.css";
import {useTranslation} from "react-i18next";
import {getTrades} from "../api/myOrders";
import {connect} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../../../components/Icon/Icon";

const Trades = (props) => {

    const {activePair , lastTransaction} = props

    const {t} = useTranslation();
    const [trades, setTrades] = useState([])
    const [openOrder, setOpenOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTrades(activePair)
            .then((trades) => {
                if (trades.status === 200) {
                    setTrades(trades.data.sort((a,b) => moment(b.time).unix() - moment(a.time).unix()).slice(0 , 50))
                }
                setIsLoading(false)
            })
    }, [activePair, lastTransaction])

    if (isLoading) {
        return <Loading/>
    }

    if (trades.length === 0) {
        return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>
    }

    return (
        <ScrollBar>
            <table
                className="text-center double-striped"
                cellSpacing="0"
                cellPadding="0">
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
                    <th/>
                </tr>
                </thead>
                <tbody>
                {trades.map((tr, index) => (
                    <Fragment key={index}>
                        <tr className={tr.isBuyer === false ? "text-green" : "text-red"}>
                            <td>{moment(tr.time).format("jYY/jMM/jDD")}</td>
                            <td>{moment(tr.time).format("HH:mm:ss")}</td>
                            <td>{tr.qty}</td>
                            <td>{tr.price}</td>
                            <td>{(tr.qty * tr.price).toLocaleString()}</td>
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
                        <tr
                            style={{display: openOrder === index ? "revert" : "none"}}>
                            <td colSpan="6" className={`py-1 px-2`}>
                                <div
                                    className="row jc-around  ai-center"
                                    style={{width: "100%"}}>
                                    <p className="col-46 row jc-between">
                                        {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                    </p>
                                    <p className="col-46 row jc-between">
                                        {t("commission")} : <span>{tr.commission} <span>{t("currency." + tr.commissionAsset.toUpperCase())}</span></span>
                                    </p>
                                </div>
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

export default connect(mapStateToProps, null)(Trades);