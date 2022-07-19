import {useQuery} from "react-query";
import axios from "axios";
import moment from "moment-jalaali";

export const useMyOrderHistory = (symbol) => {
    return useQuery(
        ['orderHistory', symbol],
        () => getOrdersHistory(symbol),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => data.sort((a, b) => moment(b.time).unix() - moment(a.time).unix()).slice(0,25)
        });
}

const getOrdersHistory = async (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', Date.now().toString());
    params.append('limit', "25");

    const {data} = await axios.get(`/api/v3/allOrders?${params.toString()}`, {
        data: params,
    })
    return data;
}
