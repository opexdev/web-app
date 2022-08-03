import {getDepositTxs} from "js-api-client";
import {useQuery} from "@tanstack/react-query";

export const useDepositTxs = (currency) => {
    return useQuery(
        ['depositTxs', currency],
        () => getDepositTxsFunc(currency),
        {
            retry: 1,
            staleTime: 5000,
            refetchInterval: 10000,
            notifyOnChangeProps: ['data', 'isLoading', 'error']
        });
}

const getDepositTxsFunc = async (currency) => {
    const {data} = await getDepositTxs(currency)
    return data;
}