import {useQuery} from "@tanstack/react-query";
import {getExchangeInfo} from "js-api-client";

export const useGetExchangeInfo = (interval) => {
    return useQuery(
        ['exchangeInfo', interval],
        () => getExchangeInfoFunc(interval),
        {
            staleTime: 5000,
            refetchInterval: 10000,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],

        });
}

const getExchangeInfoFunc = async (interval) => {
    const {data} = await getExchangeInfo(interval)
    return data;

}

