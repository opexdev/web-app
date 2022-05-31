import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../routes/routes";
import ScrollBar from "../../../../components/ScrollBar";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Wallet from "./components/Wallet/Wallet";
import Footer from "../Footer/Footer";
import Settings from "./components/Settings/Settings";
import {useSelector} from "react-redux";

const Content = () => {
    const defaultWallet = useSelector((state) => state.exchange.assets[0])
    return (
        <ScrollBar>
            <Routes>
                <Route exact path={RoutesName.Dashboard} element={<Dashboard/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.Wallet+"/:id"} element={<Wallet/>}/>
                    <Route path={RoutesName.Settings+"/*"} element={<Settings/>}/>
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={RoutesName.Wallet + "/" + defaultWallet} replace />}
                />
            </Routes>
            <Footer/>
        </ScrollBar>
    );
};

export default Content;
