import React, {Fragment, useEffect, useState} from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import FullWidthLoading from "../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setThemeInitiate} from "../store/actions";
import Dashboard from "../pages/Dashboard/Dashboard";
import i18n from "i18next";
import {images} from "../assets/images";
import Wallet from "../pages/Wallet/Wallet.js";
import {BrowserView, MobileView} from "react-device-detect";
import ReactTooltip from "react-tooltip";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import * as Routes from "../routes/routes";
import {useTranslation} from "react-i18next";
import {isSafari} from "react-device-detect";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import TechnicalChart from "../pages/TechnicalChart/TechnicalChart";
//import Toast from "../components/Toast/Toast";
import {Toaster} from "react-hot-toast";
import Guide from "../pages/Guide/Guide";

const App = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);

    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);


    const Toast = () => <Toaster position="bottom-right" toastOptions={
        {
            className: ltr ? "ltr" : "rtl",
            style: {
                padding: "0.3vh 0.8vw 0.3vh 0",
                color: "white",
                lineHeight : "3vh",
                fontSize: "0.8vw",
                borderRadius : "4px",
                background: "var(--mainContent)",
            },
            success: {
                style: {
                    background: "var(--bgGreen)",

                },
            },
            error: {
                style: {
                    background: "var(--bgRed)",
                },
            },
        }} containerStyle={{
    }}/>

    return (
        /*basename={"demo"}*/
        /*"homepage":"https://opex.dev/demo"*/
        <Router basename={"demo"}>
            <BrowserView>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/guide">
                        <Guide/>
                    </Route>
                    <ProtectedRoute
                        component={TechnicalChart}
                        isLogin={props.isLogin}
                        exact
                        path={Routes.Technical}
                    />
                    <Fragment>
                        <div
                            className={`container ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"} ${isSafari ? "" : "user-select"}`}>
                            {props.isLoading ? (
                                <FullWidthLoading/>
                            ) : (
                                <Fragment>
                                    <ReactTooltip data-html={true} data-effect="float"/>
                                    {/*<div className={`onScreen ${lang ? "wide" : ""} cursor-pointer row jc-center ai-center`} onClick={()=>setLang(true)}>
                    <Icon iconName="icon-down-open font-size-md-01" customClass={`thisButton cursor-pointer`}/>
                    {lang ?
                        <div className={`row ai-center ${classes.languages}`}>
                        <span className="cursor-pointer" onClick={() => i18n.changeLanguage("fa")}>فارسی</span>
                          <span className="cursor-pointer" onClick={() => i18n.changeLanguage("en")}>English</span>
                        </div>
                        : ""
                    }
                  </div>*/}

                                    <div className="row">
                                        <MainMenu isLogin={props.isLogin}/>
                                        <SubMenu isLogin={props.isLogin}/>
                                        <div className="column content">
                                            <Header/>
                                            <ScrollBar>
                                                <Switch>
                                                    <Route exact path={Routes.Dashboard}>
                                                        <Dashboard/>
                                                    </Route>
                                                    <ProtectedRoute
                                                        component={Wallet}
                                                        isLogin={props.isLogin}
                                                        path={Routes.Wallet}
                                                    />
                                                    <ProtectedRoute
                                                        component={Settings}
                                                        isLogin={props.isLogin}
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
                                        </div>
                                    </div>
                                    <Toast/>
                                </Fragment>
                            )}
                        </div>
                    </Fragment>
                </Switch>
            </BrowserView>

            <MobileView style={{padding: "2vh 3vw"}}>
                <div className="mobile-view">
                    <img className={`flashit`} src={images.opexLogo_light} alt="logo"/>
                    <h1>
                        اوپکس فعلاً برای نمایش در موبایل بهینه نشده است. لطفاً لینک را در
                        کامپیوتر باز کنید! :)
                    </h1>
                </div>
            </MobileView>

        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.global.isLoading,
        isDark: state.global.isDark,
        isLogin: state.auth.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(loadConfig()),
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
