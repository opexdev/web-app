import {useQuery} from "@tanstack/react-query";
import {getBuyAndSellHistory} from "js-api-client/client/txs";

export const useGetBuyAndSellHistory = (user_id, query) => {

    return useQuery(
        ['buyAndSellHistory', user_id, query.coin, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getBuyAndSellHistoryFunc(user_id, query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getBuyAndSellHistoryFunc = async (user_id, query) => {
    const {data} = await getBuyAndSellHistory(user_id, query)
    return data?.transactions;
}
