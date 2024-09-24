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
import {HistoryRelative} from "../../../../Routes/routes";
import History from "./components/History/History";

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
                    <Route path={RoutesName.HistoryRelative+"/*"} element={<History/>}/>
                </Route>
                <Route
                    path={RoutesName.WalletRelative}
                    element={<Navigate to={RoutesName.Wallet + "/" + defaultWallet} replace />}
                />

                <Route
                    path={RoutesName.HistoryRelative}
                    element={<Navigate to={RoutesName.Transactions} replace />}
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
