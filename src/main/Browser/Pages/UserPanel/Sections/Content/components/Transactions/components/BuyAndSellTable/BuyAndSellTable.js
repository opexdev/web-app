import React from 'react';
import classes from './BuyAndSellTable.module.css'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import Icon from "../../../../../../../../../../components/Icon/Icon";

const BuyAndSellTable = ({txs, offset}) => {
    const {t} = useTranslation();

    const id = useSelector(state => state.auth.id);


    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-6 flex jc-start ai-center">{t("row")}</span>
            <span className="width-9 flex jc-start ai-center">{t("date")}</span>
            <span className="width-9 flex  jc-start ai-center">{t("time")}</span>
            <span className="width-11 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
            <span className="width-15 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
            <span className="width-13 flex jc-start ai-center">{t("pricePerUnit")}</span>
            <span className="width-11 flex jc-start ai-center">{t("volume")}</span>
            <span className="width-13 flex jc-start ai-center">{t("totalPrice")}</span>
            <span className="width-11 flex jc-end ai-center">{t("TransactionCategory.FEE")}</span>
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
                                <span className={`${tr?.side === "BID" && "text-green"}`}>{tr?.side === "BID" && t("buy")}</span>
                                <span className={`${tr?.side === "ASK" && "text-red"}`}>{tr?.side === "ASK" && t("sell")}</span>
                            </span>

                            <span className="width-15 row jc-start ai-center">
                                {t("currency." + tr.symbol )}
                            </span>
                            <span className="width-13 row jc-start ai-center">
                                {new BN(tr?.matchedPrice).toFormat()}
                            </span>
                            <span className="width-11 row jc-start ai-center">
                                {new BN(tr?.volume).toFormat()}
                            </span>
                            <span className="width-13 row jc-start ai-center">
                                {new BN(tr?.transactionPrice).toFormat()}
                            </span>
                            <span className="width-11 row jc-end ai-center">
                                {new BN(tr?.fee).toFormat()}
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

export default BuyAndSellTable;
