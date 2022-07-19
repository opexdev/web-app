import {useQuery} from "react-query";
import axios from "axios";

export const useOverview = (symbol, period) => {
    return useQuery(
        ['overview', symbol, period],
        () => getOverview(symbol, period),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data[0],
        });
}

const getOverview = async (symbol, period) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    const {data} = await axios.get(`/api/v3/ticker/${period}?${params.toString()}`, {
        data: params,
    })
    return data;
}
