import {mock} from "../mockData";
import axios from "axios";
import {apiBaseUrl} from "../../../../../../../../../constants/global";

const myOrder = axios.create({
    baseURL: apiBaseUrl,
});

export const getOpexChartData = async (symbol, interval = "1d", limit = "200") => {

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('interval', interval);
    params.append('limit', limit);

    return await myOrder.get(`/api/v3/klines?${params.toString()}`).then((res) => {
        return parseCandleData(res.data.reverse());
    }).catch((e) => {
        console.log(e)
        return parseCandleData(JSON.parse(mock))
    })
}
export const getGlobalChartData = async (symbol, interval = "1d", limit = "200") => {

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('interval', interval);
    params.append('limit', limit);

    return await axios.get(`https://api.binance.com/api/v3/klines?${params.toString()}`).then((res) => {
        return parseCandleData(res.data);
    }).catch((e) => {
        console.log(e)
        return parseCandleData(JSON.parse(mock))
    })
}

const parseCandleData = (candles) => {
    return candles.map((d) => {
        return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
            value: parseFloat(d[5]) * 10000000,
            color: parseFloat(d[4]) > parseFloat(d[1]) ? "#18a979" : "#d73e36",
        };
    });
}