import React, {useState} from "react";
import classes from "./TransactionHistoryTable.module.css"
import moment from "moment-jalaali";
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Date from "../../../../../../../../../../components/Date/Date";
import {BN} from "../../../../../../../../../../utils/utils";


const TransactionHistoryTable = ({txs, offset}) => {
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
                return status;
        }
    };


    let head = (
        <div className="row text-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-6 flex jc-start ai-center">{t("row")}</span>
            <span className="width-9 flex jc-start ai-center">{t("date")}</span>
            <span className="width-9 flex  jc-start ai-center">{t("time")}</span>
            <span className="width-11 flex jc-start ai-center">{t("TransactionHistory.category")}</span>
            <span className="width-15 flex jc-start ai-center">{t("TransactionHistory.coin")}</span>
            <span className="width-13 flex jc-start ai-center">{t("volume")}</span>
            {/*<span className="width-12 flex jc-end ai-center">{t("details")}</span>*/}
            <span className="width-31 flex jc-start ai-center">{t("description")}</span>
        </div>
    );

    let body = (
        <>
            {txs.map((tr, index) => {
                return (

                    <div className={`column ${classes.striped}`} key={index}>

                        <div className={`${classes.row}  row rounded-5 border-bottom px-2 py-2`} key={index}>

                         <span className="width-6 row jc-start ai-center">
                             {index + offset + 1}
                         </span>
                            <span className="width-9 row jc-start ai-center">
                             <Date date={tr.date}/>
                         </span>
                            <span className="width-9 row jc-start ai-center">
                             {moment(tr.date).format("HH:mm:ss")}
                         </span>
                            <span className="width-11 row jc-start ai-center">
                             {t('TransactionCategory.'+tr.category)}
                         </span>
                            <span className="width-15 row jc-start ai-center">
                             <span className={`ml-05`}>{t("currency." + tr.currency )}</span>
                             {/*<span className={`fs-0-9 text-gray mr-05`}>{tr.currency}</span>*/}
                         </span>
                            <span className="width-13 row jc-start ai-center">
                            {new BN(tr?.amount).toFormat()}
                         </span>
                         <span className="width-37 row jc-start ai-center">
                             {(tr?.category === "DEPOSIT" || tr?.category === "WITHDRAW") ? "----" :
                                 <>
                                     <span> {t('TransactionCategory.'+tr.category)}</span>
                                     <span className={`mr-05`}>{tr?.additionalData?.ask && t('sell')} {tr?.additionalData?.bid && t('buy')}</span>
                                     <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                     <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                     <span className={`mr-05`}>{t("withPrice")}</span>
                                     <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                     <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                 </>
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
                            <div className={`row `}>
                                <span> {t('TransactionCategory.'+tr.category)}</span>
                                <span className={`mr-05`}>{tr?.additionalData?.ask && t('ask')} {tr?.additionalData?.bid && t('bid')}</span>
                                <span className={`mr-05`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                <span className={`mr-05`}>{t("withPrice")}</span>
                                <span className={`mr-05`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                <span className={`mr-05`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                            </div>

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