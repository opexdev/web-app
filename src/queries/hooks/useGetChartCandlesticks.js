import {useQuery} from "@tanstack/react-query";
import {getChartData, parseCandleData} from "js-api-client";

export const useGetChartCandlesticks = (activePairSymbol, type = "Global", interval = "1d", limit = "200") => {
    return useQuery(
        ['candlesticks', activePairSymbol, type],
        () => getChartCandles(activePairSymbol, type, interval, limit),
        {
            initialData: [],
            refetchInterval: 30000,
            retry: 1,
            select: (data) => {
                if (type !== "Global") {
                    data = data.sort((a, b) => a[0] - b[0])
                }
                return parseCandleData(data)
            }
        });
}

export const getChartCandles = async (activePairSymbol, type, interval, limit) => {
    const {data} = await getChartData(activePairSymbol, type, interval, limit)
    return data;
}

