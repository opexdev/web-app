import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {getTransactionHistory} from "js-api-client/client/txs";

export const useGetTransactionsHistory = (query) => {

    return useQuery(
        ['transactionsHistory', query.currency, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getTransactionsHistoryFunc(query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getTransactionsHistoryFunc = async (query) => {

    const {data} = await axios.post(`/wallet/v2/transaction`, query)
    return data;
}
