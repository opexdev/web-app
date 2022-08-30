import {useQuery} from "@tanstack/react-query";
import {getUserAssetsEstimatedValue} from "js-api-client";

export const useGetUserAssetsEstimatedValue = (quoteAsset) => {
    return useQuery(
        ['marketStats', quoteAsset],
        () => getUserAssetsEstimatedValueFunc(quoteAsset),
        {
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getUserAssetsEstimatedValueFunc = async (quoteAsset) => {
    const {data} = await getUserAssetsEstimatedValue(quoteAsset)
    return data;

}

