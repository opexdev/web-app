import {useQuery} from "@tanstack/react-query";
import {getOrderBook} from "js-api-client";

export const useOrderBook = (symbol, onSuccess) => {
    return useQuery(
        ['orderBook', symbol],
        () => getOrderBookFunc(symbol),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            onSuccess
        });
}


const getOrderBookFunc = async (symbol) => {
    const {data} = await getOrderBook(symbol)
    return data;
}
