import {useQuery} from "@tanstack/react-query";
import {getBuyAndSellHistory, getWithdrawHistory} from "js-api-client/client/txs";
import {useSelector} from "react-redux";

export const useGetWithdrawHistory = (query) => {

    const user_id = useSelector((state) => state.auth.id)

    return useQuery(
        ['withdrawHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getWithdrawHistoryFunc(query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawHistoryFunc = async (query) => {
    const {data} = await getWithdrawHistory(query)
    return data;
}
