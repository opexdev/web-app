import React from "react";
import classes from "./TheContent.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import {Route, Switch} from "react-router-dom";
import * as Routes from "../../../../routes/routes";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import Footer from "../../../Browser/Sections/Footer/Footer";
import {useTranslation} from "react-i18next";
import TheDashboard from "./components/TheDashboard/TheDashboard";


const TheContent = () => {

    const {t} = useTranslation();

    return (
        <div className={`container ${classes.container}`}>
            <ScrollBar>
                <Switch>
                    <Route exact path={Routes.Dashboard}>
                        <TheDashboard/>
                    </Route>
                    {/*<ProtectedRoute
                        component={}
                        isLogin={isLogin}
                        path={Routes.Wallet}
                    />
                    <ProtectedRoute
                        component={}
                        isLogin={isLogin}
                        path={Routes.Settings}
                    />*/}
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

export default TheContent;
