import {useQuery} from "@tanstack/react-query";
import {getLastPrices} from "js-api-client";

export const useGetLastPrices = () => {
    return useQuery(
        ['lastPrices'], getLastPricesFunc,
        {
            retry: 1,
            initialData: [],
            refetchInterval: 5000
        });
}

export const getLastPricesFunc = async () => {
    const newPrices = {}
    const {data} = await getLastPrices()
    for (const price of data) {
        newPrices[price.symbol] = price.price
    }
    return newPrices;
}