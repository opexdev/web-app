import React, {useEffect, useState} from "react";
import classes from "./TechnicalChart.module.css";
import {connect} from "react-redux";
import {isSafari} from "react-device-detect";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import MainMenu from "../../../MainMenu/MainMenu";
import AdvanceTradingView from "../../../../../../components/AdvanceTradingView/AdvanceTradingView";

const TechnicalChart = (props) => {
    const [ltr, setLtr] = useState(false);
    useEffect(() => {
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    return (
        <div
            className={`row  ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"} ${
                isSafari ? "" : "user-select"
            }`}>
            <ReactTooltip data-html={true} data-effect="float"/>
            <MainMenu/>
            <div
                className={`column ${classes.content}`}>
                <AdvanceTradingView/>
            </div>
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
export default connect(mapStateToProps, null)(TechnicalChart);
