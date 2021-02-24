import React from "react";
import classes from "./SubMenu.module.css";
import Market from "./components/Market/Market";
import {Route, Switch} from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import Wallet from "../../pages/Wallet/wallet";
import * as Routes from "../../routes/routes";
import Chart from "../../pages/Chart/chart";
import WalletSubMenu from "./components/WalletSubMenu/WalletSubMenu";
import {useTranslation} from "react-i18next";
import SettingsSubMenu from "./components/SettingsSubMenu/SettingsSubMenu";


const SubMenu = (props) => {
    const {t} = useTranslation();

    return (
        <div className={`card-background  ${classes.container}`} >
            <Switch>
                <Route exact path={Routes.Dashboard}>
                    <Market/>
                </Route>
                <Route exact path={Routes.Wallet}>
                    <WalletSubMenu/>
                </Route>
                <Route path={Routes.Settings}>
                    <SettingsSubMenu/>
                </Route>
                {/*<ProtectedRoute component={WalletSubMenu} isLogin={props.isLogin} exact path={Routes.WalletSubMenu}/>*/}

                <Route path="*">
                    <h3>{t('comingSoon')}</h3>
                </Route>
            </Switch>


        </div>
    )
};

export default SubMenu;