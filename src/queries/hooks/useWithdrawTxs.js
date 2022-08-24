import {useQuery} from "@tanstack/react-query";
import {getWithdrawTxs} from "js-api-client";

export const useWithdrawTxs = (currency) => {
    return useQuery(
        ['withdrawTxs', currency],
        () => getWithdrawTxsFunc(currency),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getWithdrawTxsFunc = async (currency) => {
    const {data} = await getWithdrawTxs(currency)
    return data;
}