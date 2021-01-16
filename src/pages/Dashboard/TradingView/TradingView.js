import React from 'react';
import classes from "./TradingView.module.css"
import * as LightweightCharts from "lightweight-charts";
import {connect} from "react-redux";
import {mock} from "./mockData";
import i18n from "i18next";
import i18next from "i18next";


const TradingView = (props) => {

    let chartProperties;
    const chart = React.useRef();
    const chartContainerRef = React.useRef();
    const resizeObserver = React.useRef();
    const lightColors = {
        upColor: '#18a979',
        downColor: '#d73e36',
        borderDownColor: '#d73e36',
        borderUpColor: '#18a979',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
    }
    const darkColors = {
        upColor: '#18a979',
        downColor: '#d73e36',
        borderDownColor: '#d73e36',
        borderUpColor: '#18a979',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
    }
    const histogramColors = {
        color: '#444444c7',
        lineWidth: 2,
        priceFormat: {
            type: 'volume',
        },
        overlay: true,
        scaleMargins: {
            top: 0.8,
            bottom: 0,
        },
    }
    const darkTheme = {
        layout: {
            backgroundColor: '#282a36',
            textColor: 'rgba(255, 255, 255, 0.9)',
            fontFamily: i18next.language === "fa" ? "iranyekan" : "Segoe UI"
        },
        grid: {
            vertLines: {
                color: '#334158',
            },
            horzLines: {
                color: '#334158',
            },
        },
        priceScale: {
            borderColor: '#485c7b',
        },
        timeScale: {
            borderColor: '#485c7b',
        }
    }
    const lightTheme = {
        layout: {
            backgroundColor: '#ffffff',
            textColor: '#191919',
            fontFamily: i18next.language === "fa" ? "iranyekan" : "Segoe UI"
        },
        grid: {
            vertLines: {
                color: '#d6dcde',
            },
            horzLines: {
                color: '#d6dcde',
            },
        },
        priceScale: {
            borderColor: '#2b2b43',
        },
        timeScale: {
            borderColor: '#2b2b43',
        }
    }


    React.useEffect(() => {
        let theme = lightColors;

        chartProperties = {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            localization: {
                locale: i18next.language === "fa" ? "fa-IR" : "en-US",
                dateFormat: 'yyyy/MM/dd',
            }
        }

        if (props.isDark) {
            theme = darkColors;
            chartProperties = {
                ...chartProperties,
                layout: darkTheme.layout,
                grid: darkTheme.grid,
                priceScale: darkTheme.priceScale,
                timeScale: darkTheme.timeScale
            }
        }


        chart.current = LightweightCharts.createChart(chartContainerRef.current, chartProperties);

        const candleSeries = chart.current.addCandlestickSeries(theme);

        const volumeSeries = chart.current.addHistogramSeries(histogramColors);

        fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=200`)
            .then(res => res.json())
            .catch(() => JSON.parse(mock))
            .then((data) => {
                const cdata = data.map(d => {
                    return {
                        time: d[0] / 1000,
                        open: parseFloat(d[1]),
                        high: parseFloat(d[2]),
                        low: parseFloat(d[3]),
                        close: parseFloat(d[4]),
                        value: parseFloat(d[5]),
                        color: parseFloat(d[4]) > parseFloat(d[1]) ? "#18a979" : "#d73e36"
                    }
                });

                candleSeries.setData(cdata);
                volumeSeries.setData(cdata);
            })

        return () => {
            if (chart.current !== null) {
                chart.current.remove();
                chart.current = null;
            }
        }
    }, []);


    React.useEffect(() => {
        i18n.on('languageChanged', (lng) => {
            chart.current.applyOptions({
                localization: {
                    locale: lng === "fa" ? "fa-IR" : "en-US",
                    dateFormat: 'yyyy/MM/dd',
                }
            })
            chart.current.applyOptions({
                localization: {
                    locale: lng === "fa" ? "fa-IR" : "en-US",
                    dateFormat: 'yyyy/MM/dd',
                }
            })
        })
        resizeObserver.current = new ResizeObserver(entries => {
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
                layout: darkTheme.layout,
                grid: darkTheme.grid,
                priceScale: darkTheme.priceScale,
                timeScale: darkTheme.timeScale,
            })
        } else {
            chart.current.applyOptions({
                ...chartProperties,
                layout: lightTheme.layout,
                grid: lightTheme.grid,
                priceScale: lightTheme.priceScale,
                timeScale: lightTheme.timeScale,
            })
        }

    }, [props.isDark]);


    return (
        <div ref={chartContainerRef} className={`container card-background card-border  ${classes.chartContainer}`}>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        activePair: state.global.activePair,
        isDark: state.global.isDark
    }
}

export default connect(mapStateToProps, null)(TradingView);

