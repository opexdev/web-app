    import React, {useState} from "react";
    import classes from "./TransactionHistoryTable.module.css"
    import moment from "moment-jalaali";
    import {Trans, useTranslation} from "react-i18next";
    import {toast} from "react-hot-toast";
    import Date from "../../../../../../../../../../components/Date/Date";
    import {BN} from "../../../../../../../../../../utils/utils";
    import {useSelector} from "react-redux";
    import Icon from "../../../../../../../../../../components/Icon/Icon";
    import i18n from "i18next";


    const TransactionHistoryTable = ({txs, offset}) => {
        const [openItem, setOpenItem] = useState(false);
        const {t} = useTranslation();

        const id = useSelector(state => state.auth.id);


        const copyAddressToClipboard = (value) => {
            navigator.clipboard.writeText(value)
            toast.success(<Trans
                i18nKey="DepositWithdraw.copy"
            />);
        }

        const txCategory = (category) => {
            switch (category) {
                case "DEPOSIT":
                    return t("TransactionCategory.DEPOSIT");
                case "FEE":
                    return t("TransactionCategory.FEE");
                case "TRADE":
                    return t("TransactionCategory.TRADE");
                case "WITHDRAW":
                    return t("TransactionCategory.WITHDRAW");
                case "WITHDRAW_REQUEST":
                    return t("TransactionCategory.WITHDRAW_REQUEST");
                case "WITHDRAW_ACCEPT":
                    return t("TransactionCategory.WITHDRAW_ACCEPT");
                case "WITHDRAW_REJECT":
                    return t("TransactionCategory.WITHDRAW_REJECT");
                case "ORDER_CANCEL":
                    return t("TransactionCategory.ORDER_CANCEL");
                case "ORDER_CREATE":
                    return t("TransactionCategory.ORDER_CREATE");
                case "ORDER_FINALIZED":
                    return t("TransactionCategory.ORDER_FINALIZED");
                case "PURCHASE_FINALIZED":
                    return t("TransactionCategory.PURCHASE_FINALIZED");
                default:
                    return t("TransactionCategory.ETC");
            }
        };

        const sideHandler = (category, takerDirection, makerDirection, isTaker, isMaker, ask, bid, num) => {



            if (category === "ORDER_CREATE" || category === "ORDER_CANCEL") {
                return  <span className={``}>{ask && t('sell')} {bid && t('buy')}</span>
            }

            if (((takerDirection === "ASK") || (makerDirection === "BID")) && isTaker && isMaker) {
                return <span className={``}>{t('TransactionHistory.selfTrade')}</span>
            }

            if (takerDirection === "ASK" && isTaker) {
                return <span className={``}>{t('sell')}</span>
            }
            if (makerDirection === "BID" && isMaker) {
                return <span className={``}>{t('buy')}</span>
            }


            if (makerDirection === "ASK" && isTaker) {
                return <span className={``}>{t('buy')}</span>
            }
            if (takerDirection === "BID" && isMaker) {
                return <span className={``}>{t('sell')}</span>
            }

            else {


            }

        }


        let head = (
            <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
                <span className="width-5 flex jc-start ai-center">{t("row")}</span>
                <span className="width-8 flex jc-start ai-center">{t("date")}</span>
                <span className="width-7 flex  jc-start ai-center">{t("time")}</span>
                <span className="width-13 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
                <span className="width-12 flex jc-start ai-center">{t("volume")}</span>
                <span className="width-10 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
                {/*<span className="width-12 flex jc-end ai-center">{t("details")}</span>*/}
                <span className="width-46 flex jc-between ai-center">
                    <span>{t("description")}</span>
                    <span>{t("TransactionHistory.balanceStatus")}</span>

                </span>
            </div>
        );

        let body = (
            <>
                {txs.map((tr, index) => {

                    const isMaker = tr?.additionalData?.makerUuid === id
                    const isTaker = tr?.additionalData?.takerUuid === id

                    const isSelfTrade = (((tr?.additionalData?.takerDirection === "ASK") || ( tr?.additionalData?.makerDirection === "BID")) && isTaker && isMaker)

                    console.log("isSelfTrade", index , isSelfTrade)

                    return (

                        <div className={`column ${classes.striped}`} key={index}>

                            <div className={`${classes.row} row rounded-5 border-bottom px-2 py-2`} key={index}>
                                <span className="width-5 row jc-start ai-center">
                                    {index + offset + 1}
                                </span>
                                    <span className="width-8 row jc-start ai-center">
                                    <Date date={tr.date}/>
                                </span>
                                    <span className="width-7 row jc-start ai-center">
                                    {moment(tr.date).format("HH:mm:ss")}
                                </span>
                                    <span className="width-13 row jc-start ai-center">
                                    {txCategory(tr.category)}
                                </span>
                                <span className={`width-12 ${i18n.language !== "fa" ? 'row-reverse jc-end' : 'row jc-start'}  ai-center`}>
                                    <span className={`fs-0-8 text-gray`}>{tr.currency}</span>
                                    <span className={`mx-05`}>{new BN(tr?.amount).toFormat() }</span>

                                    {
                                        ( (tr?.category === "TRADE") && isSelfTrade) ? "" : <>
                                            {
                                                (tr?.category !== "WITHDRAW_REQUEST" && tr?.category !== "WITHDRAW_REJECT" && tr?.category !== "WITHDRAW_ACCEPT" && tr?.category !== "ORDER_CREATE" && tr?.category !== "ORDER_CANCEL" )
                                                && <div className={`row`}>{tr?.withdraw ? '-' : '+'}</div>
                                            }
                                        </>
                                    }

                                </span>

                                <span className="width-10 row jc-start ai-center">
                                    <span className={`ml-05`}>{t("currency." + tr.currency )}</span>
                                </span>

                                <span className="width-46 row jc-between ai-center">
                                 {( tr?.category === "FEE" ||
                                     tr?.category === "TRADE" ||
                                     tr?.category === "ORDER_CANCEL" ||
                                     tr?.category === "ORDER_CREATE"  ||
                                     tr?.category === "ORDER_FINALIZED" ) ? <>

                                     <div className={`row jc-start`}>


                                         { (tr?.category === "FEE") ? <span className={`ml-05`}>{t("TransactionHistory.forFee")}</span> : ""}


                                         {
                                             sideHandler(tr?.category, tr?.additionalData?.takerDirection, tr?.additionalData?.makerDirection, isTaker, isMaker, tr?.additionalData?.ask, tr?.additionalData?.bid, (index + offset + 1))
                                         }

                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                         <span className={`mr-05`}>{t("withPrice")}</span>
                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                     </div>

                                     <div className={`row jc-end  fs-0-9`}>

                                         {
                                             (tr?.category === "TRADE" && !isSelfTrade) || (tr?.category === "FEE") || (tr?.category === "ORDER_FINALIZED") ? <div className={`row ${tr?.withdraw ? 'text-red' : 'text-green'}`}><span className={`ml-05`}>{t("currency." + tr.currency )}</span><Icon iconName={`${tr?.withdraw ? 'icon-down' : 'icon-up'} flex`} customClass={`flex jc-center ai-center`}/></div> : ""
                                         }


                                     </div>


                                 </>  : "----"

                                 }
                             </span>

                            </div>

                            <div className={`width-100 px-2 py-2`} style={{display: openItem === index ? "revert" : "none"}}>


                            </div>

                        </div>



                    )
                })}
            </>
        );


        return  <>
            {head}
            {body}
        </>
    }

    export default TransactionHistoryTable;