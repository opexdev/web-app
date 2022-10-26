import {useQuery} from "@tanstack/react-query";
import {getOverview} from "js-api-client";

export const useOverview = (symbol, period, quote) => {
    return useQuery(
        ['overview', symbol, period, quote],
        () => getOverviewFunc(symbol, period, quote),
        {
            staleTime: 5000,
            refetchInterval: 10000,
            select: (data) => {return symbol ? data[0] : data},
        });
}

const getOverviewFunc = async (symbol, period, quote) => {
    const {data} = await getOverview(symbol, period, quote)
    return data;
}

