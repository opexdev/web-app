import React from 'react';
import classes from './TransactionsTable.module.css';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";

const TransactionsTable = ({txs, offset}) => {
    const {t} = useTranslation();

    const id = useSelector(state => state.auth.id);

    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            {/*<span className="width-9 flex jc-start ai-center">{t("row")}</span>*/}
            <span className="width-12 flex jc-start ai-center">{t("date")}</span>
            <span className="width-12 flex  jc-start ai-center">{t("time")}</span>
            <span className="width-17 flex jc-start ai-center">{t("history.category")}</span>
            <span className="width-17 flex jc-start ai-center">{t("history.currency")}</span>
            <span className="width-18 flex jc-start ai-center">{t("history.balanceChange")}</span>
            <span className="width-24 flex jc-end ai-center">{t("history.balance")}</span>
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

                    <div className={`column ${classes.striped}`} key={index}>

                        <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                            {/*<span className="width-9 row jc-start ai-center">
                                {index + offset + 1}
                            </span>*/}
                            <span className="width-12 row jc-start ai-center">
                                <Date date={tr.date}/>
                            </span>
                            <span className="width-12 row jc-start ai-center">
                                {moment.utc(tr.date).local().format("HH:mm:ss")}
                            </span>
                            <span className="width-17 row jc-start ai-center">
                                {t("TransactionCategory." + tr.category )}
                            </span>

                            <span className="width-17 row jc-start ai-center">
                                {t("currency." + tr.currency )}
                            </span>

                            <span className="width-18 row jc-start ai-center">
                                <span className={`direction-ltr ${new BN(tr?.balanceChange).isLessThan(0) ? "text-red" : "text-green"}`}>{new BN(tr?.balanceChange).toFormat()}</span>
                            </span>

                            <span className="width-24 row jc-end ai-center">
                                <span className={`direction-ltr`}>{new BN(tr?.balance).toFormat()}</span>

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

export default TransactionsTable;
