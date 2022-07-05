import axios from "axios";

export const parseCandleData = (candles) => {
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

export const getChartData = (activePairSymbol,type = "Global", interval = "1d", limit = "200") => {

    const url = type === "Global" ? "/binance/api/v3/klines" : "/api/v3/klines";
    const symbol = type === "Global" ? removeTestCoin(activePairSymbol) : activePairSymbol;

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('interval', interval);
    params.append('limit', limit);

    return axios.get(`${url}?${params.toString()}`)
}

const removeTestCoin = (pair) => {
    return pair.replace("TBTC", "BTC")
        .replace("TETH", "ETH")
        .replace("TUSDT", "USDT")
        .replace("TBUSD", "BUSD")
        .replace("TBNB", "BNB")
}