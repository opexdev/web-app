import React from 'react';
import classes from './WithdrawHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";

const WithdrawHistoryTable = ({txs, offset}) => {

    const {t} = useTranslation();

    const id = useSelector(state => state.auth.id);

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

    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-4 flex jc-start ai-center">{t("row")}</span>
            <span className="width-6 flex jc-start ai-center">{t("date")}</span>
            <span className="width-6 flex  jc-start ai-center">{t("time")}</span>
            <span className="width-8 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
            <span className="width-10 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
            <span className="width-12 flex jc-start ai-center">{t("DepositWithdraw.network")}</span>
            <span className="width-7 flex jc-start ai-center">{t("volume")}</span>
            <span className="width-8 flex jc-start ai-center">{t("status")}</span>
            <span className="width-19 flex jc-start ai-center">{t("TransactionHistory.destAddress")}</span>
            <span className="width-19 flex jc-end ai-center">{t("DepositWithdrawTx.transactionId")}</span>
            <span className="width-19 flex jc-end ai-center">{t("TransactionHistory.type")}</span>
            {/*<span className="width-12 flex jc-end ai-center">{t("details")}</span>*/}

        </div>
    );
    let body = (
        <>
            {txs.map((tr, index) => {

                const isMaker = tr?.additionalData?.makerUuid === id
                const isTaker = tr?.additionalData?.takerUuid === id

                const isSelfTrade = (((tr?.additionalData?.takerDirection === "ASK") || ( tr?.additionalData?.makerDirection === "BID")) && isTaker && isMaker)

                return (

                    <div className={`column ${classes.striped} fs-0-9`} key={index}>

                        <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                            <span className="width-4 row jc-start ai-center">
                                {index + offset + 1}
                            </span>
                            <span className="width-6 row jc-start ai-center">
                                <Date date={tr.applyTime}/>
                            </span>
                            <span className="width-6 row jc-start ai-center">
                                {moment(tr.applyTime).format("HH:mm:ss")}
                            </span>
                            <span className="width-8 row jc-start ai-center">
                                <span className={`text-red`}>{ t("TransactionCategory.WITHDRAW")}</span>
                            </span>

                            <span className="width-10 row jc-start ai-center">
                                {t("currency." + tr.coin )}
                            </span>

                            <span className="width-12 row jc-start ai-center">
                                {tr.network}
                            </span>


                            <span className="width-7 row jc-start ai-center">
                                {new BN(tr?.amount).toFormat()}
                            </span>

                            <span className="width-8 row jc-start ai-center">
                                {txStatus(tr.status)}
                            </span>
                            <span className="width-19 row jc-start ai-center fs-0-8">
                                {tr.address}
                            </span>
                            <span className="width-19 row jc-end ai-center fs-0-8">
                                {tr.txId}
                            </span>





                        </div>

                    </div>



                )
            })}
        </>
    );





    return (
        <>
            {head}
            {body}
        </>
    );
};

export default WithdrawHistoryTable;
