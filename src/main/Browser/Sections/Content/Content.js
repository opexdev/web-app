import React from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import * as Routes from "../../../../routes/routes";
import {useTranslation} from "react-i18next";
import ScrollBar from "../../../../components/ScrollBar";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Wallet from "./components/Wallet/Wallet";
import Footer from "../Footer/Footer";
import Settings from "./components/Settings/Settings";


const Content = ({isLogin}) => {
    const {t} = useTranslation();

    return (
        <ScrollBar>
            <Switch>
                <Route exact path={Routes.Dashboard}>
                    <Dashboard/>
                </Route>
                <ProtectedRoute
                    component={Wallet}
                    isLogin={isLogin}
                    path={Routes.Wallet}
                />
                <ProtectedRoute
                    component={Settings}
                    isLogin={isLogin}
                    path={Routes.Settings}
                />
                <Route path="*">
                    <div
                        className="container flex ai-center jc-center"
                        style={{height: "70%"}}>
                        <h1>{t("comingSoon")}</h1>
                    </div>
                </Route>
            </Switch>
            <Footer/>
        </ScrollBar>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
    };
};


export default connect(mapStateToProps, null)(Content);
