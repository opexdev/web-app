import React, {useLayoutEffect} from "react";
import DataFeed from "./DataFeed";

const widgetOptions = {
  symbol: "BTC/USDT",
  fullscreen: false,
  container_id: "jsChartContainer",
  datafeed: DataFeed,
  library_path: "/charting_library/",
  debug: false, // uncomment this line to see Library errors and warnings in the console
  interval: "1H",
  locale: "fa",
  drawings_access: {type: "black", tools: [{name: "Regression Trend"}]},
  disabled_features: [],
  enabled_features: [],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  theme: "light",
  width: "100%",
  height: "100%",
};

const AdvanceTradingView = (props) => {
  useLayoutEffect(() => {
    const widget = (window.tvWidget = new window.TradingView.widget(
      widgetOptions,
    ));

    widget.onChartReady(() => {
      console.log("Chart has loaded!");
    });
  }, []);
  return (
    <div
      style={{width: "100%", height: "100%"}}
      id={widgetOptions.container_id}
    />
  );
};

export default AdvanceTradingView;
