import axios from "axios";
import {useQuery} from "react-query";

export const useDepositTxs = (currency) => {
    return useQuery(
        ['depositTxs', currency],
        () => getDepositTxs(currency),
        {
            refetchOnMount: false,
            staleTime: 5000,
            refetchInterval: 15000,
            notifyOnChangeProps :['error']
        });
}

const getDepositTxs = async (currency) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', Date.now().toString());
    const {data} = await axios.get(`/sapi/v1/capital/deposit/hisrec?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
    return data;
}

