    import React, {useState} from "react";
    import classes from "./TransactionHistoryTable.module.css"
    import moment from "moment-jalaali";
    import {Trans, useTranslation} from "react-i18next";
    import {toast} from "react-hot-toast";
    import Date from "../../../../../../../../../../components/Date/Date";
    import {BN} from "../../../../../../../../../../utils/utils";
    import {useSelector} from "react-redux";


    const TransactionHistoryTable = ({txs, offset}) => {
        const [openItem, setOpenItem] = useState(false);
        const {t} = useTranslation();

        const id = useSelector(state => state.auth.id);

        console.log("id", id)

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


        let head = (
            <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
                <span className="width-5 flex jc-start ai-center">{t("row")}</span>
                <span className="width-8 flex jc-start ai-center">{t("date")}</span>
                <span className="width-7 flex  jc-start ai-center">{t("time")}</span>
                <span className="width-13 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
                <span className="width-12 flex jc-start ai-center">{t("volume")}</span>
                <span className="width-10 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
                {/*<span className="width-12 flex jc-end ai-center">{t("details")}</span>*/}
                <span className="width-46 flex jc-start ai-center">{t("description")}</span>
            </div>
        );

        let body = (
            <>
                {txs.map((tr, index) => {

                    const isMaker = tr?.additionalData?.makerUuid === id
                    const isTaker = tr?.additionalData?.takerUuid === id

                    return (

                        <div className={`column ${classes.striped}`} key={index}>

                            <div className={`${classes.row}  row rounded-5 border-bottom px-2 py-2`} key={index}>
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
                                         <span> {t('TransactionCategory.'+tr.category)}</span>

                                         {tr?.category === "ORDER_CREATE" &&

                                             <span className={`mr-05`}>{tr?.additionalData?.ask && t('sell')} {tr?.additionalData?.bid && t('buy')}</span>
                                         }

                                         {tr?.additionalData?.takerDirection === "ASK" && isTaker ? <span className={`mr-05`}>{t('sell')}</span> : ""}
                                         {tr?.additionalData?.makerDirection === "BID" && isMaker ? <span className={`mr-05`}>{t('buy')}</span> : ""}

                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                         <span className={`mr-05`}>{t("withPrice")}</span>
                                         <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                         <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                     </div>

                                     <div className={`row jc-end text-orange fs-0-9`}>

                                         { (tr?.wallet === "main") && (tr?.withdraw === true) && (tr?.category !== "FEE") ? <span>{t("TransactionHistory.assetBlock")}</span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === false) ? <span>{t("TransactionHistory.readyToExchange")}</span> : ""}
                                         { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? <span className={`text-green`}>{t("TransactionHistory.increaseWallet")}</span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? <span className={`text-red`}>{t("TransactionHistory.decreaseWallet")}</span> : ""}
                                         { (tr?.category === "FEE") ? <span className={`text-red`}>{t("TransactionHistory.decreaseWallet")}</span> : ""}
                                         { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.assetUnBlocked")}</span> : ""}
                                         { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.cancelExchange")}</span> : ""}
                                         { (tr?.category === "ORDER_FINALIZED") ? <span>{t("TransactionHistory.finished")}</span> : ""}




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