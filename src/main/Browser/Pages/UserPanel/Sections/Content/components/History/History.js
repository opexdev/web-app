import React, {useState} from 'react';
import classes from './History.module.css';
import {useTranslation} from "react-i18next";
import Transactions from "./components/Transactions/Transactions";
import DepositHistory from "./components/DepositHistory/DepositHistory";
import WithdrawHistory from "./components/WithdrawHistory/WithdrawHistory";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../../../Routes/routes";
import {DepositRelative} from "../../../../../../Routes/routes";



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
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text "+classes.active : "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text"
                            }
                            to={RoutesName.Transactions}>
                            {t("history.transactions")}
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text "+classes.active : "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text"
                            }
                            to={RoutesName.Deposit}>
                            {t("history.deposit")}
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text "+classes.active : "ml-1 px-2 py-1 rounded-5 cursor-pointer hover-text"
                            }
                            to={RoutesName.Withdraw}>
                            {t("history.withdraw")}
                        </NavLink>
                    </div>
                    <div className={`${classes.content} width-100`}>
                        <Routes>
                            <Route path={RoutesName.History} element={<Navigate to={{pathname: `${RoutesName.Transactions}`}} replace/>}/>
                            <Route path={RoutesName.TransactionsRelative} element={<Transactions/>}/>
                            <Route path={RoutesName.DepositRelative} element={<DepositHistory/>}/>
                            <Route path={RoutesName.WithdrawRelative} element={<WithdrawHistory/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
