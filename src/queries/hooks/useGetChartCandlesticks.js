import axios from "axios";
import {useQuery} from "react-query";

export const useGetChartCandlesticks = (activePairSymbol, type = "Global", interval = "1d", limit = "200") => {
    return useQuery(
        ['candlesticks', activePairSymbol, type],
        () => getChartData(activePairSymbol, type, interval, limit),
        {
            initialData: [],
            refetchOnMount: false,
            refetchInterval: 30000,
            select: (data) => {
                if (type !== "Global") {
                    data = data.sort((a, b) => a[0] - b[0])
                }
                return parseCandleData(data)
            }
        });
}

export const getChartData = async (activePairSymbol, type, interval, limit) => {
    const url = type === "Global" ? "/binance/api/v3/klines" : "/api/v3/klines";
    const symbol = type === "Global" ? removeTestCoin(activePairSymbol) : activePairSymbol;

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('interval', interval);
    params.append('limit', limit);

    const {data} = await axios.get(`${url}?${params.toString()}`)
    return data;
}


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

const removeTestCoin = (pair) => {
    return pair.replace("TBTC", "BTC")
        .replace("TETH", "ETH")
        .replace("IRT", "USDT")
        .replace("TUSDT", "USDT")
        .replace("TBUSD", "BUSD")
        .replace("TBNB", "BNB")
}