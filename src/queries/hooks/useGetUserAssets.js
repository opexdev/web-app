import {useQuery} from "@tanstack/react-query";
import {getUserAssets} from "js-api-client";

export const useGetUserAssets = (quoteAsset) => {
    return useQuery(
        ['UserAssets', quoteAsset],
        () => getUserAssetsFunc(quoteAsset),
        {
            staleTime: 5000,
            refetchInterval: 10000,

        });
}

const getUserAssetsFunc = async (quoteAsset) => {
    const {data} = await getUserAssets(quoteAsset)
    return data;

}

