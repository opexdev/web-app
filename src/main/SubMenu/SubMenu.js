import React from "react";
import classes from "./SubMenu.module.css";
import Market from "./components/Market/Market";
import {Route, Switch} from "react-router-dom";
import * as Routes from "../../routes/routes";
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
                <Route path="*">
                    <h3>{t('comingSoon')}</h3>
                </Route>
            </Switch>


        </div>
    )
};

export default SubMenu;