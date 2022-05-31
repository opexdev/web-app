import React from "react";
import classes from "./TheContent.module.css";
import ScrollBar from "../../../../components/ScrollBar";
import {Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../routes/routes";
import {useTranslation} from "react-i18next";
import TheDashboard from "./components/TheDashboard/TheDashboard";
import TheWallet from "./components/TheWallet/TheWallet";
import TheSettings from "./components/TheSettings/TheSettings";

const TheContent = () => {

    const {t} = useTranslation();

    return (
        <div className={`container ${classes.container}`}>
            <ScrollBar>
                <Routes>
                    <Route path={RoutesName.MobileDashboard} element ={<TheDashboard/>}/>
                    <Route path={RoutesName.Wallet} element={<TheWallet/>}/>
                    <Route path={RoutesName.Settings} element={<TheSettings/>}/>
                    <Route path="*">
                        <div className="container flex ai-center jc-center"
                            style={{height: "70%"}}>
                            <h1>{t("comingSoon")}</h1>
                        </div>
                    </Route>
                </Routes>
            </ScrollBar>
        </div>
    );
};


export default TheContent;
