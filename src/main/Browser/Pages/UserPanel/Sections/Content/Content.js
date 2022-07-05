import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import ScrollBar from "../../../../../../components/ScrollBar";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Wallet from "./components/Wallet/Wallet";
import Footer from "../Footer/Footer";
import Settings from "./components/Settings/Settings";
import {useSelector} from "react-redux";
import {Profile, Security} from "../../../../Routes/routes";

const Content = () => {
    const defaultWallet = useSelector((state) => state.exchange.assets[0])
    return (
        <ScrollBar>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.WalletRelative+"/:id"} element={<Wallet/>}/>
                    <Route path={RoutesName.SettingsRelative+"/*"} element={<Settings/>}/>
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
            <Footer/>
        </ScrollBar>
    );
};

export default Content;
