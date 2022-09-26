import React from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrders.module.css";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";

const StopMarket = (props) => {

    return (
        <ScrollBar>
            <table className="text-center striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr>
                    <th className="pt-1">{t("time")}</th>
                    <th>{t("date")}</th>
                    <th>
                        {t("volume")}({props.activePair.base})
                    </th>
                    <th>
                        {t("pricePerUnit")}({props.activePair.quote})
                    </th>
                    <th>{t("totalPrice")}</th>
                    <th>{t("myOrders.stoppedPrice")}</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {[].stop.map((tr, index) => (
                    <tr
                        key={index}
                        className={tr.type === "buy" ? "text-green" : "text-red"}>
                        <td>{moment(tr.timestamp).format("HH:mm:ss")}</td>
                        <td>{moment(tr.timestamp).format("jYY/jMM/jDD")}</td>
                        <td>{tr.volume}</td>
                        <td>{tr.price}</td>
                        <td>{tr.totalPrice}</td>
                        <td>{tr.stopPrice}</td>
                        <td>
                            <Icon
                                iconName="icon-cancel text-red fs-0-7"
                                iconBG={`bg-red ${classes.iconBG} cursor-pointer`}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </ScrollBar>
    )
}

export default StopMarket;