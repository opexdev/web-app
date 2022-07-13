import {useQuery} from "react-query";
import axios from "axios";

export const useLastTrades = (symbol, onSuccess) => {
    return useQuery(
        ['lastTrades', symbol],
        () => getLastTrades(symbol),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 10000,
            onSuccess
        });
}

const getLastTrades = async (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('limit', "25");
    const {data} = await axios.get(`/api/v3/trades?${params.toString()}`, {
        data: params,
    })
    return data;
}
