import React, {useLayoutEffect} from "react";
import DataFeed from "./DataFeed";
import {connect} from "react-redux";

const widgetOptions = {
    symbol: "BTC/USDT",
    fullscreen: false,
    container_id: "jsChartContainer",
    datafeed: DataFeed,
    library_path: "/charting_library/",
    // debug: true, // uncomment this line to see Library errors and warnings in the console
    interval: "3",
    locale: "fa",
    drawings_access: {type: "black", tools: [{name: "Regression Trend"}]},
    disabled_features: [],
    enabled_features: [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    width: "100%",
    height: "100%",
};

const AdvanceTradingView = (props) => {
    useLayoutEffect(() => {
        const widget = (window.tvWidget = new window.TradingView.widget(
            {...widgetOptions, theme: props.isDark ? "dark" : "light"},
        ));

        widget.onChartReady(() => {
            console.log("Chart has loaded!");
        });
    }, [props.isDark]);
    return (
        <div
            style={{width: "100%", height: "100%"}}
            id={widgetOptions.container_id}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};
export default connect(mapStateToProps, null)(AdvanceTradingView);
