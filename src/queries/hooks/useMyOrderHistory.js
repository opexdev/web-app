import moment from "moment";
import {useQuery} from "@tanstack/react-query";
import {getOrdersHistory} from "js-api-client";

export const useMyOrderHistory = (symbol) => {
    return useQuery(
        ['orderHistory', symbol],
        () => getOrdersHistoryFunc(symbol),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => moment(b.time).unix() - moment(a.time).unix()).slice(0, 25)
        });
}

const getOrdersHistoryFunc = async (symbol) => {
    const {data} = await getOrdersHistory(symbol)
    return data;
}