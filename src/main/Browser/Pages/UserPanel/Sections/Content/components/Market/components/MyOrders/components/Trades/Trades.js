import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrders.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useMyTrades} from "../../../../../../../../../../../../queries";
import Date from "../../../../../../../../../../../../components/Date/Date";
import {BN} from "../../../../../../../../../../../../utils/utils";

const Trades = () => {


    const {t} = useTranslation();
    const [openOrder, setOpenOrder] = useState(null)

    const activePair = useSelector((state) => state.exchange.activePair)
    const lastTransaction = useSelector((state) => state.auth.lastTransaction);

    const {data, isLoading, error, refetch} = useMyTrades(activePair.symbol)

    useEffect(() => {
        refetch()
    }, [lastTransaction])

    if (error) return <Error/>

    if (isLoading) return <Loading/>

    if (data.length === 0) return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>

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
                {data.map((tr, index) => (
                    <Fragment key={index}>
                        <tr className={tr.isBuyer === false ? "text-green" : "text-red"}>
                            <td><Date date={tr.time}/></td>
                            <td>{moment(tr.time).format("HH:mm:ss")}</td>
                            <td>{tr.qty}</td>
                            <td>{tr.price}</td>
                            <td>{(tr.qty * tr.price).toLocaleString()}</td>
                            {openOrder === index ? (
                                <td onClick={() => setOpenOrder(null)}>
                                    <Icon
                                        iconName="icon-up-open text-blue fs-0-7"
                                        customClass={`${classes.iconBG} cursor-pointer`}
                                    />
                                </td>
                            ) : (
                                <td onClick={() => setOpenOrder(index)}>
                                    <Icon
                                        iconName="icon-down-open text-blue fs-0-7"
                                        customClass={`${classes.iconBG} cursor-pointer`}
                                    />
                                </td>
                            )}
                        </tr>
                        <tr
                            style={{display: openOrder === index ? "revert" : "none"}}>
                            <td colSpan="6" className={`py-1 px-1 fs-0-9`}>
                                <div
                                    className="row jc-between  ai-center"
                                    style={{width: "100%"}}>
                                    <p className="width-47 row jc-between">
                                        {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                    </p>
                                    <p className="width-47 row jc-between">
                                        {t("commission")} : <span>{new BN(tr.commission).toFormat()} <span>{t("currency." + tr.commissionAsset.toUpperCase())}</span></span>
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

export default Trades;