import {getOpenOrder} from "js-api-client";
import {useQuery} from "@tanstack/react-query";
import moment from "moment";

export const useMyOpenOrders = (symbol) => {
    return useQuery(
        ['openOrders', symbol],
        () => getOpenOrderFunc(symbol),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => moment(b.time).unix() - moment(a.time).unix())
        });
}


const getOpenOrderFunc = async (symbol) => {
    const {data} = await getOpenOrder(symbol)
    return data;
}