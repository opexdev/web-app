import axios from "axios";
import {useQuery} from "react-query";

export const useWithdrawTxs = (currency) => {
    return useQuery(
        ['withdrawTxs', currency],
        () => getWithdrawTxs(currency),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawTxs = async (currency) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', Date.now().toString());
    const {data} = await axios.get(`/sapi/v1/capital/withdraw/history?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
    return data;
}

