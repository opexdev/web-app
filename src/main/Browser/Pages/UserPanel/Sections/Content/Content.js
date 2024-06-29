import React from "react";
import {Navigate, Route, Routes, useMatch} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import ScrollBar from "../../../../../../components/ScrollBar";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import Market from "./components/Market/Market";
import Wallet from "./components/Wallet/Wallet";
import Footer from "../Footer/Footer";
import Settings from "./components/Settings/Settings";
import {useSelector} from "react-redux";
import TechnicalChart from "./components/TechnicalChart/TechnicalChart";
import Transactions from "./components/Transactions/Transactions";

const Content = () => {

    const isTechnicalPage = useMatch(RoutesName.Technical)
    const defaultWallet = useSelector((state) => state.exchange.assets[0])

    return (
        <ScrollBar>
            <Routes>
                <Route path="/" element={<Market/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.WalletRelative+"/:id"} element={<Wallet/>}/>
                    <Route path={RoutesName.SettingsRelative+"/*"} element={<Settings/>}/>
                    <Route path={RoutesName.TechnicalRelative} element={<TechnicalChart/>}/>
                    <Route path={RoutesName.TransactionsRelative} element={<Transactions/>}/>
                </Route>
                <Route
                    path={RoutesName.WalletRelative}
                    element={<Navigate to={RoutesName.Wallet + "/" + defaultWallet} replace />}
                />

                <Route
                    path={RoutesName.SettingsRelative}
                    element={<Navigate to={RoutesName.Security} replace />}
                />
            </Routes>
            {!isTechnicalPage && <Footer/>}
        </ScrollBar>
    );
};

export default Content;
