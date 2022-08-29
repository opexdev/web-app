import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import {getMyTrades} from "js-api-client";

export const useMyTrades = (symbol) => {
    return useQuery(
        ['myTrades', symbol],
        () => getMyTradesFunc(symbol),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => moment(b.time).unix() - moment(a.time).unix()).slice(0, 25)
        });
}


const getMyTradesFunc = async (symbol) => {
    const {data} = await getMyTrades(symbol)
    return data;
}
