    import React, {useState} from "react";
    import classes from "./TransactionHistoryTable.module.css"
    import moment from "moment-jalaali";
    import {Trans, useTranslation} from "react-i18next";
    import {toast} from "react-hot-toast";
    import Date from "../../../../../../../../../../components/Date/Date";
    import {BN} from "../../../../../../../../../../utils/utils";
    import {useSelector} from "react-redux";
    import Icon from "../../../../../../../../../../components/Icon/Icon";


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
                case "ORDER_CANCEL":
                    return t("TransactionCategory.ORDER_CANCEL");
                case "ORDER_CREATE":
                    return t("TransactionCategory.ORDER_CREATE");
                case "ORDER_FINALIZED":
                    return t("TransactionCategory.ORDER_FINALIZED");
                default:
                    return t("TransactionCategory.ETC");
            }
        };

        const sideHandler = (category, takerDirection, makerDirection, isTaker, isMaker, ask, bid, num) => {

            /*console.log("num", num, category, takerDirection, makerDirection, isTaker, isMaker, ask, bid )*/
/*
            console.log("num : ", num, "category : ", category, "takerDirection : ", takerDirection, "makerDirection : ", makerDirection, "isTaker : ", isTaker, "isMaker : ", isMaker, "ask : ", ask, "bid : ", bid )
*/


            if (category === "ORDER_CREATE" || category === "ORDER_CANCEL") {
                return  <span className={`mr-05`}>{ask && t('sell')} {bid && t('buy')}</span>
            }

            if (((takerDirection === "ASK") || (makerDirection === "BID")) && isTaker && isMaker) {
                return <span className={`mr-05`}>{t('TransactionHistory.selfTrade')}</span>
            }

            if (takerDirection === "ASK" && isTaker) {
                return <span className={`mr-05`}>{t('sell')}</span>
            }
            if (makerDirection === "BID" && isMaker) {
                return <span className={`mr-05`}>{t('buy')}</span>
            }


            if (makerDirection === "ASK" && isTaker) {
                return <span className={`mr-05`}>{t('buy')}</span>
            }
            if (takerDirection === "BID" && isMaker) {
                return <span className={`mr-05`}>{t('sell')}</span>
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
                                <span className="width-12 row jc-start ai-center">
                                    {(tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? "+ " :""}
                                    {(tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? "- " :""}
                                    {(tr?.category === "FEE") ? "- " :""}
                                    {new BN(tr?.amount).toFormat()}
                                </span>

                                <span className="width-10 row jc-start ai-center">
                                    <span className={`ml-05`}>{t("currency." + tr.currency )}</span>
                                    {/*<span className={`fs-0-9 text-gray mr-05`}>{tr.currency}</span>*/}
                                </span>

                                <span className="width-46 row jc-between ai-center">
                                 {( tr?.category === "FEE" ||
                                     tr?.category === "TRADE" ||
                                     tr?.category === "ORDER_CANCEL" ||
                                     tr?.category === "ORDER_CREATE"  ||
                                     tr?.category === "ORDER_FINALIZED" ) ? <>

                                     <div className={`row jc-start`}>
                                         {/*<span> {t('TransactionCategory.'+tr.category)}</span>*/}

                                         { (tr?.wallet === "main") && (tr?.withdraw === true) && (tr?.category !== "FEE") ? <span>{t("TransactionHistory.assetBlock")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === false) ? <span>{t("TransactionHistory.readyToExchange")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? <span className={``}>{t("TransactionHistory.increaseWallet")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? <span className={``}>{t("TransactionHistory.decreaseWallet")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.category === "FEE") ? <span className={``}>{t("TransactionHistory.decreaseWallet")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.assetUnBlocked")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.cancelExchange")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.category === "ORDER_FINALIZED") && (tr?.wallet === "main") ? <span>{t("TransactionHistory.refund")} <span className={`mr-025`}>-</span></span> : ""}
                                         { (tr?.category === "ORDER_FINALIZED") && (tr?.wallet === "exchange") ? <span>{t("TransactionHistory.startRefund")} <span className={`mr-025`}>-</span></span> : ""}

                                         {
                                             sideHandler(tr?.category, tr?.additionalData?.takerDirection, tr?.additionalData?.makerDirection, isTaker, isMaker, tr?.additionalData?.ask, tr?.additionalData?.bid, (index + offset + 1))
                                         }

                                         {/*{((tr?.additionalData?.takerDirection === "ASK") || (tr?.additionalData?.makerDirection === "BID")) && isTaker && isMaker ? <span className={`mr-05`}>self trade</span> : ""}
*/}


                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                         <span className={`mr-05`}>{t("withPrice")}</span>
                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                     </div>

                                     <div className={`row jc-end  fs-0-9`}>

                                         {/*{ (tr?.wallet === "main") && (tr?.withdraw === true) && (tr?.category !== "FEE") ? <span>{t("TransactionHistory.assetBlock")}</span> : ""}*/}
                                         {/*{ (tr?.wallet === "exchange") && (tr?.withdraw === false) ? <span>{t("TransactionHistory.readyToExchange")}</span> : ""}*/}
                                         { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? <div className={`row text-green`}><span className={`ml-05`}>{t("currency." + tr.currency )}</span><Icon iconName="icon-up flex" customClass={`flex jc-center ai-center`}/></div> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? <div className={`row text-red`}><span className={`ml-05`}>{t("currency." + tr.currency )}</span><Icon iconName="icon-down flex" customClass={`flex jc-center ai-center`}/></div>: ""}
                                         { (tr?.category === "FEE") ? <div className={`row text-red`}><span className={`ml-05`}>{t("currency." + tr.currency )}</span><Icon iconName="icon-down flex" customClass={`flex jc-center ai-center`}/></div> : ""}
                                         {/*{ (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.assetUnBlocked")}</span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.cancelExchange")}</span> : ""}*/}
                                        {/* { (tr?.category === "ORDER_FINALIZED") && (tr?.wallet === "main") ? <span>{t("TransactionHistory.refund")}</span> : ""}
                                         { (tr?.category === "ORDER_FINALIZED") && (tr?.wallet === "exchange") ? <span>{t("TransactionHistory.startRefund")}</span> : ""}*/}

                                         {/*<span className={`text-gray`}>{tr?.additionalData?.ouid.slice(0,5)}</span>*/}

                                     </div>

                                     {/*  <span className={`ml-05`}>{isTaker && "isTaker"}</span>
                                     <span className={`ml-05`}>{isMaker && "isMaker"}</span>

                                     <span className={`text-red ml-05 text-orange width-12`}>{tr?.additionalData?.takerDirection === "ASK" && isTaker ? t('ask') : ""} {tr?.additionalData?.makerDirection === "BID" && isMaker ? t('bid') :""}</span>
                                     */}

                                 </>  : "----"

                                 }
                             </span>
                                {/*<span className="width-31 row jc-end ai-center" onClick={() => openItem === index ? setOpenItem(null) : setOpenItem(index)}>
                                <Icon iconName={`${openItem === index ? "icon-up-open" : "icon-down-open"} text-blue fs-0-9 cursor-pointer`}
                                      customClass={classes.iconBG}
                                />
                             </span>*/}
                            </div>

                            <div className={`width-100 px-2 py-2`} style={{display: openItem === index ? "revert" : "none"}}>
                             {/*   <div className={`column`}>
                                    <span><span>price: {new BN(tr?.additionalData?.origPrice).toFormat()}</span></span>
                                    <span>quantity: <span>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span></span>
                                    <span>Remained Quantity: <span> {new BN(tr?.additionalData?.remainedQuantity).toFormat()}</span></span>
                                    <span>{tr?.additionalData?.pair?.rightSideName}</span>
                                    <span>{tr?.additionalData?.pair?.leftSideName}</span>
                                    <span>{txStatus(tr?.additionalData?.status)}</span>
                                    <span>{tr?.additionalData?.ask && t('ask')} {tr?.additionalData?.bid && t('bid')}</span>
                                </div>*/}
                                {/*<div className={`row `}>
                                    <span> {t('TransactionCategory.'+tr.category)}</span>
                                    <span className={`mr-05`}>{tr?.additionalData?.ask && t('ask')} {tr?.additionalData?.bid && t('bid')}</span>
                                    <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                    <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                    <span className={`mr-05`}>{t("withPrice")}</span>
                                    <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                    <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                </div>*/}

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