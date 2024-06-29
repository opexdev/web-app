import {useQuery} from "@tanstack/react-query";
import {getBuyAndSellHistory, getWithdrawHistory} from "js-api-client/client/txs";

export const useGetWithdrawHistory = (user_id, query) => {
    return useQuery(
        ['withdrawHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getWithdrawHistoryFunc(user_id, query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawHistoryFunc = async (user_id, query) => {
    const {data} = await getWithdrawHistory(user_id, query)
    return data;
}
