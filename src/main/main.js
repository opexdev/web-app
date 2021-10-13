import React, {useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {BrowserView, isSafari, MobileView} from "react-device-detect";
import Browser from "./Browser/Browser";
import Mobile from "./Mobile/Mobile";
import i18n from "i18next";
import {loadConfig, setThemeInitiate} from "../store/actions";
import {connect} from "react-redux";


const Main = (props) => {

    const [ltr, setLtr] = useState(false);

    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    return (
        /*basename={"demo"}*/
        /*"homepage":"https://opex.dev/demo"*/
        <div className={`container ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"} ${isSafari ? "" : "user-select"}`}>
            <Router basename={"demo"}>
                <BrowserView>
                    <Browser/>
                </BrowserView>
                <MobileView>
                    <Mobile/>
                </MobileView>
            </Router>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);