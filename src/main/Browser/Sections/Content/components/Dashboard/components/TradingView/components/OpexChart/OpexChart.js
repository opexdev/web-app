import React, {useEffect, useRef} from "react";
import classes from "../../TradingView.module.css";
import * as LightweightCharts from "lightweight-charts";
import {connect} from "react-redux";
import moment from "moment-jalaali";
import {getOpexChartData} from "../../api/tradingView";
import i18n from "i18next";
import {candleColors, darkTheme, histogramColors, lightTheme} from "../../../../../../../../../../constants/chart";

const TradingView = (props) => {
    const {activePair, isDark} = props
    let chartProperties;

    const chart = useRef();
    const chartContainerRef = useRef();
    const resizeObserver = useRef();

    const timeScale = {
        tickMarkFormatter: (time) => {
            if (i18n.language === "fa") return moment(time * 1000).format("jYYYY/jM/jD")
            return moment(time * 1000).format("YYYY/M/D");
        },
    }

    useEffect(() => {
        let theme = candleColors;
        const fontFamily = i18n.language === undefined || i18n.language === "fa" ? "iranyekan" : "Segoe UI"

        chartProperties = {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                ...lightTheme.layout,
                fontFamily
            },
            localization: {
                locale: i18n.language === "fa" ? "fa-IR" : "en-US",
            },
            grid: lightTheme.grid,
            priceScale: lightTheme.priceScale,
            timeScale: {...lightTheme.timeScale, ...timeScale}
        };

        if (isDark) {
            theme = darkTheme;
            chartProperties = {
                ...chartProperties,
                layout: {
                    ...darkTheme.layout,
                    fontFamily
                },
                grid: darkTheme.grid,
                priceScale: darkTheme.priceScale,
                timeScale: {...darkTheme.timeScale, ...timeScale},
            };
        }

        chart.current = LightweightCharts.createChart(
            chartContainerRef.current,
            chartProperties,
        );
        const candleSeries = chart.current.addCandlestickSeries(theme);
        const volumeSeries = chart.current.addHistogramSeries(histogramColors);

        getOpexChartData(activePair).then((candles) => {
            candleSeries.setData(candles);
            volumeSeries.setData(candles);
        })
        return () => {
            if (chart.current !== null) {
                chart.current.remove();
                chart.current = null;
            }
        };
    }, [activePair]);

    useEffect(() => {
        i18n.on("languageChanged", (lng) => {
            if (chart.current !== null) {
                chart.current.applyOptions({
                    localization: {
                        locale: lng === "fa" ? "fa-IR" : "en-US",
                    },
                    layout: {
                        fontFamily: lng === "fa" ? "iranyekan" : "Segoe UI",
                    },
                });
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

    useEffect(() => {
        if (isDark) {
            chart.current.applyOptions({
                ...chartProperties,
                layout: {
                    ...darkTheme.layout,
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
                },
                grid: lightTheme.grid,
                priceScale: lightTheme.priceScale,
                timeScale: lightTheme.timeScale,
            });
        }
    }, [isDark]);

    return (
        <div
            ref={chartContainerRef}
            className={`container  ${classes.chartContainer}`}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair.symbol,
        isDark: state.global.isDark,
    };
};

export default connect(mapStateToProps, null)(TradingView);
