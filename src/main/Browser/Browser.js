import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../routes/routes";
import {useTranslation} from "react-i18next";
import {isSafari} from "react-device-detect";
import {Toaster} from "react-hot-toast";
import Login from "../../pages/Login/Login";
import Guide from "../../pages/Guide/Guide";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import MainMenu from "./Sections/MainMenu/MainMenu";
import SubMenu from "./Sections/SubMenu/SubMenu";
import Header from "./Sections/Header/Header";
import Content from "./Sections/Content/Content";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setThemeInitiate} from "../../store/actions";
import TechnicalChart from "./Sections/Content/components/TechnicalChart/TechnicalChart";
import "./Browser.css"


const Browser = (props) => {

    const [ltr, setLtr] = useState(false);


    const Toast = () => <Toaster position="bottom-right" toastOptions={
        {
            className: ltr ? "ltr" : "rtl",
            style: {
                padding: "0.3vh 0.8vw 0.3vh 0",
                color: "white",
                lineHeight: "3vh",
                fontSize: "0.8vw",
                borderRadius: "4px",
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
        }} containerStyle={{}}/>

    return (
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route path="/guide">
                <Guide/>
            </Route>
            <ProtectedRoute
                component={TechnicalChart}
                isLogin={props.isLogin}
                exact
                path={Routes.Technical}
            />
            <div>
                {props.isLoading ? (<FullWidthLoading/>) : (
                    <Fragment>
                        <ReactTooltip data-html={true} data-effect="float"/>
                        <div className="row">
                            <MainMenu isLogin={props.isLogin}/>
                            <SubMenu isLogin={props.isLogin}/>
                            <div className="column content">
                                <Header/>
                                <div style={{display: "flex", flex: 1}}>
                                    <Content/>
                                </div>
                            </div>
                        </div>
                        <Toast/>
                    </Fragment>
                )}
            </div>
        </Switch>

    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.global.isLoading,
        isLogin: state.auth.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(loadConfig()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
