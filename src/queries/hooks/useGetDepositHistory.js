import {useQuery} from "@tanstack/react-query";
import {getBuyAndSellHistory, getDepositHistory, getWithdrawHistory} from "js-api-client/client/txs";
import axios from "axios";
import {useSelector} from "react-redux";

export const useGetDepositHistory = (query) => {

    const user_id = useSelector((state) => state.auth.id)

    return useQuery(
        ['depositHistory', user_id, query.currency, query.category, query.endTime, query.startTime, query.limit, query.offset, query.ascendingByTime],
        () => getDepositHistoryFunc(query),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getDepositHistoryFunc = async (query) => {
    const {data} = await getDepositHistory(query)
    return data;
}
