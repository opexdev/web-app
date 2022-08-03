import axios from "axios";
import {useQueries} from "react-query";

export const useTxs = (currency) => {
    return useQueries([
            {queryKey: ["deposit", currency], queryFn: () => getTxs(currency, "deposit")},
            {queryKey: ["withdraw", currency], queryFn: () => getWithdraw(currency)}
        ]
    );
}

const getTxs = async (currency) => {
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

const getWithdraw = async (currency) => {
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