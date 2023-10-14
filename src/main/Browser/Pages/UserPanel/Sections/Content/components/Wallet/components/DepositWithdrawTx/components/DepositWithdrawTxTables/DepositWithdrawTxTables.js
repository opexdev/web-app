import React, {Fragment, useState} from "react";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../../../utils/utils";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import classes from "../../DepositWithdrawTx.module.css";
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Date from "../../../../../../../../../../../../components/Date/Date";

const DepositWithdrawTxTables = ({txs, id}) => {
    const [openItem, setOpenItem] = useState(false);
    const {t} = useTranslation();

    const copyAddressToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        toast.success(<Trans
            i18nKey="DepositWithdraw.copy"
        />);
    }

    const txStatus = (status) => {
        switch (status) {
            case 0:
                return t("orderStatus.NEW");
            case 1:
                return t("orderStatus.DONE");
            case 2:
                return t("orderStatus.REJECTED");
            default:
                return t("orderStatus.NEW");
        }
    };

    return <table
        className="text-center double-striped"
        cellSpacing="0"
        cellPadding="0">
        <thead className="th-border-y">
        <tr>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
            <th>{t("DepositWithdrawTx.transactionType")}</th>
            <th>{t("DepositWithdrawTx.network")}</th>
            <th>{t("volume")} ({id})</th>
            <th>{t("status")}</th>
            <th>{t("details")}</th>
        </tr>
        </thead>
        <tbody>{txs.map((tr, index) => (

            <Fragment key={index}>
                <tr className={tr.hasOwnProperty('withdrawOrderId') ? "text-red" :  "text-green"}>
                    <td><Date date={tr.time}/></td>
                    <td>{moment(tr.time).format("HH:mm:ss")}</td>
                    <td>{tr.hasOwnProperty('withdrawOrderId')  ? t("withdrawal") :  t("deposit")}</td>
                    <td className={`width-20`}>{tr.network}</td>
                    <td>{new BN(tr.amount).toFormat()}</td>
                    <td className={`text-color`}>{txStatus(tr.status)}</td>
                    {openItem === index ? (
                        <td onClick={() => setOpenItem(null)}>
                            <Icon iconName="icon-up-open text-blue fs-0-7 cursor-pointer"
                                  customClass={classes.iconBG}
                            />
                        </td>
                    ) : (
                        <td onClick={() => setOpenItem(index)}>
                            <Icon iconName="icon-down-open text-blue fs-0-7 cursor-pointer"
                                  customClass={classes.iconBG}
                            />
                        </td>
                    )}
                </tr>
                <tr style={{display: openItem === index ? "revert" : "none"}}>
                    <td colSpan="9" className={`py-1 px-2`}>
                        <div className="row jc-around  ai-center" style={{width: "100%"}}>
                            <p className="col-94 row jc-between">
                                {t("DepositWithdrawTx.destination")} :
                                <span>{tr.address}</span>
                            </p>
                            <p className="col-03 row jc-end">
                                <Icon iconName="icon-copy fs-01" customClass={`hover-text cursor-pointer`}
                                      onClick={() => copyAddressToClipboard(tr.address)}/>
                            </p>
                        </div>
                        <div className="row jc-around ai-center" style={{width: "100%"}}>
                            <p className="col-94 row jc-between">
                                {t("DepositWithdrawTx.transactionId")} :
                                <span>{id === "BTC" && !tr.hasOwnProperty('withdrawOrderId') ? tr.txId.slice(0, tr.txId.indexOf("_")) : tr.txId}</span>
                            </p>
                            <p className="col-03 row jc-end">
                                <Icon
                                    iconName="icon-copy fs-01"
                                    customClass={`hover-text cursor-pointer`}
                                    onClick={() => copyAddressToClipboard(id === "BTC" && !tr.hasOwnProperty('withdrawOrderId') ? tr.txId.slice(0, tr.txId.indexOf("_")) : tr.txId)}
                                />
                            </p>
                        </div>
                    </td>
                </tr>
            </Fragment>
        ))}
        </tbody>
    </table>
}

export default DepositWithdrawTxTables;