import React from "react";
import classes from "./SubMenu.module.css";
import MarketSubMenu from "./components/MarketSubMenu/MarketSubMenu";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../routes/routes";
import WalletSubMenu from "./components/WalletSubMenu/WalletSubMenu";
import {useTranslation} from "react-i18next";
import SettingsSubMenu from "./components/SettingsSubMenu/SettingsSubMenu";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";


const SubMenu = () => {
    const {t} = useTranslation();

    return (
        <div className={`card-background  ${classes.container}`}>
            <Routes>
                <Route exact path={RoutesName.Dashboard} element={<MarketSubMenu/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.Wallet+"/*"} element={<WalletSubMenu/>}/>
                    <Route path={RoutesName.Settings+"/*"} element={<SettingsSubMenu/>}/>
                </Route>
                <Route path="*" element={<h3>{t("comingSoon")}</h3>}/>
            </Routes>
        </div>
    );
};

export default SubMenu;
