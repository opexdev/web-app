import React from "react";
import classes from "./SubMenu.module.css";
import Market from "./components/Market/Market";
import {Route, Switch} from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import Wallet from "../../pages/Wallet/wallet";
import * as Routes from "../../routes/routes";
import Chart from "../../pages/Chart/chart";
import SMWallet from "./components/Wallet/SMWallet";


const SubMenu = (props) => {

    return (
        <div className={`card-background  ${classes.container}`} >
            <Switch>
                <Route exact path={Routes.Dashboard}>
                    <Market/>
                </Route>
                <Route exact path={Routes.Wallet}>
                    <SMWallet/>
                </Route>
                {/*<ProtectedRoute component={Wallet} isLogin={props.isLogin} exact path={Routes.Wallet}/>*/}

                <Route path="*">
                    "404"
                </Route>
            </Switch>


        </div>
    )
};

export default SubMenu;