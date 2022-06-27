import React, {useEffect, useRef, useState} from "react";
import classes from "../../TradingView.module.css";
import * as LightweightCharts from "lightweight-charts";
import {useSelector} from "react-redux";
import moment from "moment-jalaali";
import {getChartData, parseCandleData} from "../../api/tradingView";
import {candleColors, darkTheme, histogramColors, lightTheme} from "../../../../../../../../../../constants/chart";
import i18n from "i18next";
import {useTranslation} from "react-i18next";


const MarketChart = ({type}) => {
    const {t} = useTranslation();
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
        setError(false)
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

        getChartData(activePair, type)
            .then((res) => {
                const candles = parseCandleData(res.data)
                candleSeries.setData(candles);
                volumeSeries.setData(candles);
            }).catch((e) => {
            console.log(e)
            setError(t('charts.noChartData'))
        })

        return () => {
            if (chart.current !== null) {
                chart.current.remove();
                chart.current = null;
            }
        };
    }, [activePair,type]);

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

    return (
        <div ref={chartContainerRef} className={`container  ${classes.chartContainer}`}>
            <p className={classes.error}>{error}</p>
        </div>
    );
};

export default MarketChart;