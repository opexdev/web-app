import React, {useEffect} from "react";
import moment from "moment-jalaali";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import {BN} from "../../../../../../../../../../../../utils/utils";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useIPGDeposit} from "../../../../../../../../../../../../queries";
import {useSelector} from "react-redux";


const IRTTx = () => {

    const {id} = useParams();
    const {t} = useTranslation();
    const KYCStatus = useSelector((state) => state.auth.kyc)
    const {data: txs, isLoading, error, refetch} = useIPGDeposit()

    useEffect(() => {
        if (KYCStatus) refetch()
    },[KYCStatus])

    const IRTtxStatusClassHandler = (status) => {
        switch (status) {
            case 'Open':
                return 'text-orange';

            case 'Canceled':
                return 'text-red';

            case 'Expired':
                return 'text-red';

            case 'Done':
                return 'text-green';

            case 'Failed':
                return 'text-red';

            case 'Undefined':
                return 'text-color';

            default:
                return 'text-color';
        }
    };

    if (!KYCStatus || error) return <Error errorMsg={KYCStatus ? null : t('errorPage.needKYC')}/>
    if (isLoading) return <Loading/>
    if (txs.length === 0) return <div className="container height-100 flex ai-center jc-center">{t("noTx")}</div>

    return (
        <ScrollBar>
            <table className="text-center striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr>
                    <th>{t("date")}</th>
                    <th>{t("time")}</th>
                    <th>{t("DepositWithdrawTx.transactionType")}</th>
                    <th>{t("volume")} ({id})</th>
                    <th>{t("unit")}</th>
                    <th>{t("status")}</th>
                </tr>
                </thead>
                <tbody>{txs.sort((a, b) => moment.utc(b.createDate) - moment.utc(a.createDate)).map((tr, index) => (
                        <tr key={index}>
                            <td>{moment.utc(tr.createDate).local().format("jYY/jMM/jDD")}</td>
                            <td>{moment.utc(tr.createDate).local().format("HH:mm:ss")}</td>
                            <td className="text-green">{t("deposit")}</td>
                            <td className="text-green">{new BN(tr.amount).multipliedBy(0.1).toFormat()}{" "}{"+"}</td>
                            <td>{t("currency." + id)}</td>
                            <td className={`${IRTtxStatusClassHandler(tr.status)}`}>{t("paymentStatus." + tr.status)}</td>
                        </tr>
                ))}
                </tbody>
            </table>
        </ScrollBar>
    );
};

export default IRTTx;
