import React, {useLayoutEffect} from "react";
import DataFeed from "./DataFeed";
import {useSelector} from "react-redux";
import i18n from "i18next";

const removeTestCoin = (pair) => {
    return pair.replace("TBTC", "BTC")
        .replace("TETH", "ETH")
        .replace("TUSDT", "USDT")
        .replace("TBUSD", "BUSD")
        .replace("TBNB", "BNB")
}

const AdvanceTradingView = () => {
    const isDark = useSelector((state) => state.global.isDark)
    const activePair = useSelector((state) => state.exchange.activePair)
    const widgetOptions = {
        symbol: removeTestCoin(activePair.baseAsset+"/"+activePair.quoteAsset),
        fullscreen: false,
        container_id: "jsChartContainer",
        datafeed: DataFeed,
        library_path: "/charting_library/",
        interval: "3",
        locale:  i18n.language,
        drawings_access: {type: "black", tools: [{name: "Regression Trend"}]},
        disabled_features: [],
        enabled_features: [],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        width: "100%",
        height: "100%",
     };

    useLayoutEffect(() => {
        const widget = (window.tvWidget = new window.TradingView.widget(
            {...widgetOptions, theme: isDark ? "dark" : "light"},
        ));

        widget.onChartReady(() => {
            console.log("Chart has loaded!");
        });
    }, [isDark]);

    return (
        <div
            style={{width: "100%", height: "100%"}}
            id={widgetOptions.container_id}
        />
    );
};
export default AdvanceTradingView;