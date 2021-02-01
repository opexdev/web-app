import React, {Fragment, useEffect, useState} from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import FullWidthLoading from "../components";
import {loadConfig} from "../store/actions";
import Dashboard from "../pages/Dashboard/dashboard";
import i18n from "i18next";
import {images} from "../assets/images";
import Wallet from "../pages/Wallet/wallet"
import {BrowserView, MobileView} from "react-device-detect";
import ReactTooltip from "react-tooltip";
import Chart from "../pages/Chart/chart";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";
import *  as Routes from '../routes/routes';


const App = (props) => {
    const [ltr, setLtr] = useState(false)

    useEffect(() => {
        props.onLoad();
        i18n.on('languageChanged', (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false)
        })
    }, [])

    return (
        /*basename={"demo"}*/
        /*"homepage":"https://opex.dev/demo"*/
        <Router basename={"demo"}>
            <BrowserView>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Fragment>
                    <div className={`container ${props.isDark ? 'dark' : ''} ${ltr ? "ltr" : "rtl"}`}>
                        {props.isLoading ? <FullWidthLoading/> : null}
                        <ReactTooltip data-html={true} data-effect="float"/>
                        <div className="row">
                            <MainMenu/>
                            <SubMenu/>
                            <div className="column content">
                                <Header/>
                                <ScrollBar>
                                    <Switch>
                                    <Route exact path={Routes.Dashboard}>
                                        <Dashboard/>
                                    </Route>
                                    <ProtectedRoute component={Wallet} isLogin={props.isLogin} exact path={Routes.Wallet}/>
                                    <ProtectedRoute component={Chart} isLogin={props.isLogin} exact path={Routes.Technical}/>
                                    <Route path="*">
                                        "404"
                                    </Route>
                                    </Switch>
                                    <Footer/>
                                </ScrollBar>
                            </div>
                        </div>
                    </div>
                    </Fragment>
                </Switch>
            </BrowserView>
            <MobileView style={{padding: "2vh 3vw"}}>

                <div className="mobile-view">

                    <img className={`flashit`} src={images.opexLogo_light} alt="logo"/>

                    <h1>اوپکس فعلاً برای نمایش در موبایل بهینه نشده است. لطفاً لینک را در کامپیوتر باز کنید! :)</h1>

                    {/*<img src={images.bit} alt="bit"/>*/}
                </div>

            </MobileView>
        </Router>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.global.isLoading,
        isDark: state.global.isDark,
        isLogin: state.auth.isLogin
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(loadConfig())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);