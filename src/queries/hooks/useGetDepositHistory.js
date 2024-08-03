import {useQuery} from "@tanstack/react-query";
import {getBuyAndSellHistory, getDepositHistory, getWithdrawHistory} from "js-api-client/client/txs";

export const useGetDepositHistory = (user_id, query) => {

    return useQuery(
        ['depositHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getDepositHistoryFunc(user_id, query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getDepositHistoryFunc = async (user_id, query) => {
    const {data} = await getDepositHistory(user_id, query)
    return data?.deposits;
}
