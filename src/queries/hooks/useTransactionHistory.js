import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useTransactionHistory = (user_id, query) => {

    return useQuery(
        ['allTxHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset],
        () => getWithdrawTxsFunc(user_id, query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawTxsFunc = async (user_id, query) => {
    const {data} = await getTransactionHistory(user_id, query)
    return data;
}

const getTransactionHistory = (user_id, query) => {
    return axios.post(`/wallet/transaction/${user_id}`, query)
}
