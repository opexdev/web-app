import {useQuery} from "@tanstack/react-query";
import {getMarketStats} from "js-api-client";

export const useGetMarketStats = (interval) => {
    return useQuery(
        ['marketStats', interval],
        () => getMarketStatsFunc(interval),
        {
            staleTime: 5000,
            refetchInterval: 10000

        });
}

const getMarketStatsFunc = async (interval) => {
    const {data} = await getMarketStats(interval)
    return data;

}

