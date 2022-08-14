import {useQuery} from "@tanstack/react-query";
import {getOverview} from "js-api-client";

export const useOverview = (symbol, period) => {
    return useQuery(
        ['overview', symbol, period],
        () => getOverviewFunc(symbol, period),
        {
            staleTime: 5000,
            refetchInterval: 10000,
            notifyOnChangeProps: ['data', 'isLoading', 'error'],
            select: (data) => {return symbol ? data[0] : data},
        });
}

const getOverviewFunc = async (symbol, period) => {
    const {data} = await getOverview(symbol, period)
    return data;
}

