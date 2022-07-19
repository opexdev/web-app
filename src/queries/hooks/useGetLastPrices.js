import axios from "axios";
import {useQuery} from "react-query";

export const useGetLastPrices = () => {
    return useQuery(
        ['lastPrices'], getLastPrices,
        {
            initialData : [],
            refetchInterval : 5000
        });
}

export const getLastPrices = async () => {
    const newPrices = {}
    const {data} = await axios.get(`/api/v3/ticker/price`)
    for (const price of data) {
        newPrices[price.symbol] = price.price
    }
    return newPrices;
}