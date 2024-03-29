import React from "react";
import classes from "./SubMenu.module.css";
import MarketSubMenu from "./components/MarketSubMenu/MarketSubMenu";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import WalletSubMenu from "./components/WalletSubMenu/WalletSubMenu";
import {useTranslation} from "react-i18next";
import SettingsSubMenu from "./components/SettingsSubMenu/SettingsSubMenu";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";


const SubMenu = () => {
    const {t} = useTranslation();

    return (
        <div className={`card-bg text-color ${classes.container}`}>
            <Routes>
                <Route path="/" element={<MarketSubMenu/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={RoutesName.WalletRelative+"/*"} element={<WalletSubMenu/>}/>
                    <Route path={RoutesName.SettingsRelative+"/*"} element={<SettingsSubMenu/>}/>
                </Route>
                <Route path="*" element={<h3>{t("comingSoon")}</h3>}/>
            </Routes>
        </div>
    );
};

export default SubMenu;
