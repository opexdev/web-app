import {ColorType} from "lightweight-charts";

export const candleColors = {
    upColor: "#18a979",
    downColor: "#d73e36",
    borderDownColor: "#d73e36",
    borderUpColor: "#18a979",
    wickDownColor: "#838ca1",
    wickUpColor: "#838ca1",
};
export const histogramColors = {
    color: "#444444c7",
    lineWidth: 2,
    priceFormat: {
        type: "volume",
    },
    priceScaleId: '',
    overlay: true,
    scaleMargins: {
        top: 0.8,
        bottom: 0,
    },
};
export const darkTheme = {
    layout: {
        background: { type: ColorType.Solid, color: '#282a36' },
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
export const lightTheme = {
    layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
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
    },
};
