import React from 'react';
import classes from './DepositHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";

const DepositHistoryTable = ({txs, offset}) => {

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
            <span className="width-6 flex jc-start ai-center">{t("row")}</span>
            <span className="width-9 flex jc-start ai-center">{t("date")}</span>
            <span className="width-9 flex  jc-start ai-center">{t("time")}</span>
            <span className="width-11 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
            <span className="width-15 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
            <span className="width-13 flex jc-start ai-center">{t("DepositWithdraw.network")}</span>
            <span className="width-11 flex jc-start ai-center">{t("volume")}</span>
            <span className="width-13 flex jc-start ai-center">{t("status")}</span>
            <span className="width-11 flex jc-end ai-center">{t("TransactionHistory.txType")}</span>

        </div>
    );
    let body = (
        <>
            {txs.map((tr, index) => {

                const isMaker = tr?.additionalData?.makerUuid === id
                const isTaker = tr?.additionalData?.takerUuid === id

                const isSelfTrade = (((tr?.additionalData?.takerDirection === "ASK") || ( tr?.additionalData?.makerDirection === "BID")) && isTaker && isMaker)

                return (

                    <div className={`column ${classes.striped}`} key={index}>

                        <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                            <span className="width-6 row jc-start ai-center">
                                {index + offset + 1}
                            </span>
                            <span className="width-9 row jc-start ai-center">
                                <Date date={tr.createDate}/>
                            </span>
                            <span className="width-9 row jc-start ai-center">
                                {moment(tr.createDate).format("HH:mm:ss")}
                            </span>
                            <span className="width-11 row jc-start ai-center">
                                <span className={`text-green`}>{ t("TransactionCategory.DEPOSIT")}</span>
                            </span>

                            <span className="width-15 row jc-start ai-center">
                                {t("currency." + tr.currency )}
                            </span>

                            <span className="width-13 row jc-start ai-center">
                                {tr.network}
                            </span>


                            <span className="width-11 row jc-start ai-center">
                                {new BN(tr?.amount).toFormat()}
                            </span>

                            <span className="width-13 row jc-start ai-center">
                                {txStatus(tr.status)}
                            </span>
                            <span className="width-11 row jc-end ai-center">
                                {tr.depositType}
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

export default DepositHistoryTable;
