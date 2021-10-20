import React from "react";
import classes from "./TheContent.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import {Route, Switch} from "react-router-dom";
import * as Routes from "../../../../routes/routes";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import Footer from "../../../Browser/Sections/Footer/Footer";
import {useTranslation} from "react-i18next";
import TheDashboard from "./components/TheDashboard/TheDashboard";
import TheWallet from "./components/TheWallet/TheWallet";
import {connect} from "react-redux";
import TheSettings from "./components/TheSettings/TheSettings";
import {MobileDashboard} from "../../../../routes/routes";


const TheContent = ({isLogin}) => {

    const {t} = useTranslation();

    return (
        <div className={`container ${classes.container}`}>
            <ScrollBar>
                <Switch>
                    <Route path={Routes.MobileDashboard}>
                        <TheDashboard/>
                    </Route>
                    <Route
                        component={TheWallet}
                        /*isLogin={isLogin}*/
                        path={Routes.Wallet}
                    />
                    <Route
                        component={TheSettings}
                        /*isLogin={isLogin}*/
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
            </ScrollBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
    };
};


export default connect(mapStateToProps, null)(TheContent);
