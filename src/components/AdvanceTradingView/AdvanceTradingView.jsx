import React, {useEffect, useLayoutEffect} from "react";
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
  disabled_features: [
    // "use_localstorage_for_settings",
    // "header_widget",
    // "volume_force_overlay",
    // "timeframes_toolbar",
  ],
  enabled_features: ["study_templates"],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  theme: "light",
  width: "100%",
  height: "100%",
  // toolbar_bg: "#171b2b",
  // loading_screen: {
  //   backgroundColor: "#171b2b",
  // },
  // studies_overrides: {
  //   "volume.volume.color.0": "#e0294a",
  //   "volume.volume.color.1": "#2ebd85",
  //   "volume.volume.transparency": 65,
  // },
  // overrides: {
  //   "paneProperties.background": "#171b2b",
  //   "mainSeriesProperties.candleStyle.upColor": "#2ebd85",
  //   "mainSeriesProperties.candleStyle.downColor": "#e0294a",
  //   "mainSeriesProperties.candleStyle.wickUpColor": "#2ebd85",
  //   "mainSeriesProperties.candleStyle.wickDownColor": "#e0294a",
  //   "mainSeriesProperties.candleStyle.borderUpColor": "#2ebd85",
  //   "mainSeriesProperties.candleStyle.borderDownColor": "#e0294a",
  // },
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
