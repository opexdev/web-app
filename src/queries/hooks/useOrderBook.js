import axios from "axios";
import {useQuery} from "react-query";

export const useOrderBook = (symbol, onSuccess) => {
    return useQuery(
        ['orderBook', symbol],
        () => getOrderBook(symbol),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 5000,
            onSuccess
        });
}

const getOrderBook = async (symbol, period) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('limit', "20");
    const {data} = await axios.get(`/api/v3/depth?${params.toString()}`, {
        data: params,
    })
    return data;
}