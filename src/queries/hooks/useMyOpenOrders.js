import {useQuery} from "react-query";
import axios from "axios";
import moment from "moment-jalaali";

export const useMyOpenOrders = (symbol) => {
    return useQuery(
        ['openOrders', symbol],
        () => getOpenOrder(symbol),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => moment(b.time).unix() - moment(a.time).unix())
        });
}

const getOpenOrder = async (symbol) => {

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', Date.now().toString());

    const {data} = await axios.get(`/api/v3/openOrders?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
    return data;
}