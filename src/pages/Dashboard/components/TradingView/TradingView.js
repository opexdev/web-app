import React from "react";
import classes from "./TradingView.module.css";
import * as LightweightCharts from "lightweight-charts";
import {connect} from "react-redux";
import {mock} from "./mockData";
import i18n from "../../../../i18n/i18n";
import i18next from "i18next";
import moment from "moment-jalaali";

const TradingView = (props) => {
  let chartProperties;
  const chart = React.useRef();
  const chartContainerRef = React.useRef();
  const resizeObserver = React.useRef();
  const lightColors = {
    upColor: "#18a979",
    downColor: "#d73e36",
    borderDownColor: "#d73e36",
    borderUpColor: "#18a979",
    wickDownColor: "#838ca1",
    wickUpColor: "#838ca1",
  };
  const darkColors = {
    upColor: "#18a979",
    downColor: "#d73e36",
    borderDownColor: "#d73e36",
    borderUpColor: "#18a979",
    wickDownColor: "#838ca1",
    wickUpColor: "#838ca1",
  };
  const histogramColors = {
    color: "#444444c7",
    lineWidth: 2,
    priceFormat: {
      type: "volume",
    },
    overlay: true,
    scaleMargins: {
      top: 0.8,
      bottom: 0,
    },
  };
  const darkTheme = {
    layout: {
      backgroundColor: "#282a36",
      textColor: "rgba(255, 255, 255, 0.9)",
    },
    grid: {
      vertLines: {
        color: "#334158",
      },
      horzLines: {
        color: "#334158",
      },
    },
    priceScale: {
      borderColor: "#485c7b",
    },
    timeScale: {
      borderColor: "#485c7b",
    },
  };
  const lightTheme = {
    layout: {
      backgroundColor: "#ffffff",
      textColor: "#191919",
    },
    grid: {
      vertLines: {
        color: "#d6dcde",
      },
      horzLines: {
        color: "#d6dcde",
      },
    },
    priceScale: {
      borderColor: "#2b2b43",
    },
    timeScale: {
      borderColor: "#2b2b43",
      tickMarkFormatter: (time, tickMarkType, locale) => {
        return moment(time * 1000).format("jYYYY/jM/jD");
      },
    },
  };

  React.useEffect(() => {
    let theme = lightColors;
    chartProperties = {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        ...lightTheme.layout,
        fontFamily:
          i18next.language === undefined || i18next.language === "fa"
            ? "iranyekan"
            : "Segoe UI",
      },
      grid: lightTheme.grid,
      priceScale: lightTheme.priceScale,
      timeScale: lightTheme.timeScale,
    };

    if (props.isDark) {
      theme = darkTheme;
      chartProperties = {
        ...chartProperties,
        layout: {
          ...darkTheme.layout,
          fontFamily:
            i18next.language === undefined || i18next.language === "fa"
              ? "iranyekan"
              : "Segoe UI",
        },
        grid: darkTheme.grid,
        priceScale: darkTheme.priceScale,
        timeScale: darkTheme.timeScale,
      };
    }

    chart.current = LightweightCharts.createChart(
      chartContainerRef.current,
      chartProperties,
    );
    const candleSeries = chart.current.addCandlestickSeries(theme);
    const volumeSeries = chart.current.addHistogramSeries(histogramColors);

    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${props.activePair.baseAsset}${
        props.activePair.quoteAsset === "IRT" ? "USDT" : props.activePair.quoteAsset
      }&interval=1d&limit=200`,
    )
      .then((res) => {
        if(res.status === 200) return res.json()
        return JSON.parse(mock)
      })
      .catch(() => JSON.parse(mock))
      .then((data) => {
        const cdata = data.map((d) => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
            value: parseFloat(d[5]),
            color: parseFloat(d[4]) > parseFloat(d[1]) ? "#18a979" : "#d73e36",
          };
        });

        candleSeries.setData(cdata);
        volumeSeries.setData(cdata);
      });

    /*function businessDayToString(businessDay) {
            return businessDay.year + '-' + businessDay.month + '-' + businessDay.day;
        }

        var toolTipWidth = 100;
        var toolTipHeight = 80;
        var toolTipMargin = 15;

        var toolTip = document.createElement('div');
        toolTip.className = 'floating-tooltip-2';
        chartContainerRef.current.appendChild(toolTip);

        var width = chartContainerRef.current.clientWidth;
        var height = chartContainerRef.current.clientHeight;
// update tooltip
        chart.current.subscribeCrosshairMove(function(param) {
            if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
                toolTip.style.display = 'none';
                return;
            }

            var dateStr = LightweightCharts.isBusinessDay(param.time)
                ? businessDayToString(param.time)
                : new Date(param.time * 1000).toLocaleDateString();

            toolTip.style.display = 'block';
            var price = param.seriesPrices.get(candleSeries);
            toolTip.innerHTML = '<div style="color: rgba(255, 70, 70, 1)">Apple Inc.</div>' +
                '<div style="font-size: 24px; margin: 4px 0px">' + Math.round(price * 100) / 100 + '</div>' +
                '<div>' + dateStr + '</div>';

            var y = param.point.y;

            var left = param.point.x + toolTipMargin;
            if (left > width - toolTipWidth) {
                left = param.point.x - toolTipMargin - toolTipWidth;
            }

            var top = y + toolTipMargin;
            if (top > height - toolTipHeight) {
                top = y - toolTipHeight - toolTipMargin;
            }

            toolTip.style.left = left + 'px';
            toolTip.style.top = top + 'px';
        });
*/
    return () => {
      if (chart.current !== null) {
        chart.current.remove();
        chart.current = null;
      }
    };
  }, [props.activePair]);

  React.useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      if (chart.current !== null) {
        chart.current.applyOptions({
          localization: {
            locale: lng === "fa" ? "fa-IR" : "en-US",
            dateFormat: console.log("rub"),
          },
          layout: {
            fontFamily:
              i18next.language === undefined || i18next.language === "fa"
                ? "iranyekan"
                : "Segoe UI",
          },
        });
        // chart.current.applyOptions({
        //     localization: {
        //         locale: lng === "fa" ? "fa-IR" : "en-US",
        //         dateFormat: moment().format('jYYYY/jM/jD'),
        //     },
        //     layout: { fontFamily: (i18next.language === undefined || i18next.language === "fa") ? "iranyekan" : "Segoe UI"},
        // })
      }
    });

    resizeObserver.current = new ResizeObserver((entries) => {
      const {width, height} = entries[0].contentRect;
      chart.current.applyOptions({width, height});
      setTimeout(() => {
        if (chart.current !== null) {
          chart.current.timeScale().fitContent();
        }
      }, 0);
    });
    resizeObserver.current.observe(chartContainerRef.current);
    return () => resizeObserver.current.disconnect();
  }, []);

  React.useEffect(() => {
    if (props.isDark) {
      chart.current.applyOptions({
        ...chartProperties,
        layout: {
          ...darkTheme.layout,
          fontFamily:
            i18next.language === undefined || i18next.language === "fa"
              ? "iranyekan"
              : "Segoe UI",
        },
        grid: darkTheme.grid,
        priceScale: darkTheme.priceScale,
        timeScale: darkTheme.timeScale,
      });
    } else {
      chart.current.applyOptions({
        ...chartProperties,
        layout: {
          ...lightTheme.layout,
          fontFamily:
            i18next.language === undefined || i18next.language === "fa"
              ? "iranyekan"
              : "Segoe UI",
        },
        grid: lightTheme.grid,
        priceScale: lightTheme.priceScale,
        timeScale: lightTheme.timeScale,
      });
    }
  }, [props.isDark]);
  return (
    <div
      ref={chartContainerRef}
      className={`container card-background card-border  ${classes.chartContainer}`}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
    isDark: state.global.isDark,
  };
};

export default connect(mapStateToProps, null)(TradingView);
