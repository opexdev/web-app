import React, {useState} from 'react';
import classes from './History.module.css';
import {useTranslation} from "react-i18next";
import Transactions from "./components/Transactions/Transactions";
import DepositHistory from "../Transactions/components/DepositHistory/DepositHistory";
import WithdrawHistory from "../Transactions/components/WithdrawHistory/WithdrawHistory";


const History = () => {

    const {t} = useTranslation();

    const [activeTx, setActiveTx] = useState("transactions")


    const content = () => {
        if (activeTx === "transactions") return <Transactions/>
        if (activeTx === "deposit") return <DepositHistory/>
        if (activeTx === "withdraw") return <WithdrawHistory/>
    }

    return (
        <>
            <div className={`column px-1 pt-1`}>
                <div className={`width-100 border card-bg px-2 py-2 rounded-8 column jc-start ai-center`}>
                    <div className={`row jc-start ai-center width-100 ${classes.header}`}>
                        <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "transactions" && classes.active}`} onClick={()=>setActiveTx("transactions")}>{t("history.transactions")}</span>
                        <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "deposit" && classes.active}`} onClick={()=>setActiveTx("deposit")}>{t("history.deposit")}</span>
                        <span className={`ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeTx === "withdraw" && classes.active}`} onClick={()=>setActiveTx("withdraw")}>{t("history.withdraw")}</span>
                    </div>
                    <div className={`${classes.content} width-100`}>
                        {content()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
