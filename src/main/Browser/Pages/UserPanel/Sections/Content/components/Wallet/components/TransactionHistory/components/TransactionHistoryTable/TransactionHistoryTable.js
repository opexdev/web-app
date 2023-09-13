import React, {Fragment, useState} from "react";
import moment from "moment-jalaali";
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Date from "../../../../../../../../../../../../components/Date/Date";

const TransactionHistoryTable = ({txs}) => {
    const [openItem, setOpenItem] = useState(false);
    const {t} = useTranslation();

    const copyAddressToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        toast.success(<Trans
            i18nKey="DepositWithdraw.copy"
        />);
    }

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
            <th>{t("volume")}</th>
            <th>{t("status")}</th>
            <th>{t("details")}</th>
        </tr>
        </thead>
        <tbody>{txs.map((tr, index) => (
            <Fragment key={index}>
                <tr>
                    <td><Date date={tr.date}/></td>
                    <td>{moment(tr.date).format("HH:mm:ss")}</td>
                    <td>{t('TransactionCategory.'+tr.category)}</td>
                    <td>{tr.currency}</td>
                    <td>{tr.amount}</td>
                    <td>{tr?.additionalData?.ask && t('ask')} {tr?.additionalData?.bid && t('bid')}</td>
                    <td>{tr?.additionalData?.remainedQuantity}</td>
                </tr>
            </Fragment>
        ))}
        </tbody>
    </table>
}

export default TransactionHistoryTable;