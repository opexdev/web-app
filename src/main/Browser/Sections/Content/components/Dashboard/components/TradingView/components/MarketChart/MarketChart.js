import React, {useEffect, useRef, useState} from "react";
import classes from "../../TradingView.module.css";
import * as LightweightCharts from "lightweight-charts";
import {useSelector} from "react-redux";
import moment from "moment-jalaali";
import {getGlobalChartData} from "../../api/tradingView";
import {candleColors, darkTheme, histogramColors, lightTheme} from "../../../../../../../../../../constants/chart";
import i18n from "i18next";
import Error from "../../../../../../../../../../components/Error/Error";


const MarketChart = () => {
    let chartProperties;
    const chart = useRef();
    const [error, setError] = useState(false)

    const activePair = useSelector((state) => state.exchange.activePair)
    const isDark = useSelector((state) => state.global.isDark)

    const chartContainerRef = useRef();
    const resizeObserver = useRef();

    const timeScale = {
        tickMarkFormatter: (time) => {
            if (i18n.language === undefined || i18n.language === "fa") return moment(time * 1000).format("jYYYY/jM/jD")
            return moment(time * 1000).format("YYYY/M/D");
        },
    }

    useEffect(() => {
        const fontFamily = (i18n.language === undefined || i18n.language === "fa") ? "iranyekan" : "Segoe UI"
        chartProperties = {
            layout: {
                ...lightTheme.layout,
                fontFamily
            },
            crosshair: {
                vertLine: {
                    visible: true,
                    labelVisible: false,
                },
                horzLine: {
                    visible: true,
                    labelVisible: true,
                },
                mode: 1,
            },
            localization: {
                locale: (i18n.language === undefined || i18n.language === "fa") ? "fa-IR" : "en-US",
            },
            grid: lightTheme.grid,
            priceScale: lightTheme.priceScale,
            timeScale: {...lightTheme.timeScale, ...timeScale}
        };
        if (isDark) {
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

        const candleSeries = chart.current.addCandlestickSeries(isDark ? darkTheme : candleColors);
        const volumeSeries = chart.current.addHistogramSeries(histogramColors);

        getGlobalChartData(activePair).then((candles) => {
            candleSeries.setData(candles);
            volumeSeries.setData(candles);
        }).catch(() => setError(true))

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

    }, [])

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

    if (error) return <Error/>
    return (
        <div
            ref={chartContainerRef}
            className={`container  ${classes.chartContainer}`}
        />
    );
};

export default MarketChart;