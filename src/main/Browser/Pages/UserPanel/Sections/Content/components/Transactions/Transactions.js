import React, {useState} from 'react';
import classes from './Transactions.module.css';
import Icon from "../../../../../../../../components/Icon/Icon";
import {Link} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../components/TextInput/TextInput";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import BuyAndSell from "./components/BuyAndSell/BuyAndSell";
import WithdrawHistory from "./components/WithdrawHistory/WithdrawHistory";
import DepositHistory from "./components/DepositHistory/DepositHistory";

const Transactions = () => {

    const {t} = useTranslation();

    const [activeTx, setActiveTx] = useState("buyAndSell")


    const content = () => {
      if (activeTx === "buyAndSell") return <BuyAndSell/>
        if (activeTx === "deposit") return <DepositHistory/>
        if (activeTx === "withdraw") return <WithdrawHistory/>
    }

    return (<>


        <div className={`column px-1 pt-1`}>

            <div className={`width-100 border card-bg px-2 py-2 rounded-8 column jc-start ai-center`}>

                <div className={`row jc-start ai-center width-100 ${classes.header}`}>
                    <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "buyAndSell" && classes.active}`} onClick={()=>setActiveTx("buyAndSell")}>{t("TransactionHistory.buyAndSell")}</span>
                    <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "deposit" && classes.active}`} onClick={()=>setActiveTx("deposit")}>{t("TransactionCategory.DEPOSIT")}</span>
                    <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "withdraw" && classes.active}`} onClick={()=>setActiveTx("withdraw")}>{t("TransactionCategory.WITHDRAW")}</span>
                </div>
                <div className={`${classes.content} width-100`}>

                    {content()}

                </div>



            </div>


        </div>




    </>

    );
};

export default Transactions;
