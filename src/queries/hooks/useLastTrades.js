import {useQuery} from "@tanstack/react-query";
import {getLastTrades} from "js-api-client";

export const useLastTrades = (symbol, onSuccess) => {
    return useQuery(
        ['lastTrades', symbol],
        () => getLastTradesFunc(symbol),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            onSuccess
        });
}

const getLastTradesFunc = async (symbol) => {
    const {data} = await getLastTrades(symbol)
    return data;
}