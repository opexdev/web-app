import {useQuery} from "@tanstack/react-query";
import {getFeeForSymbol} from "js-api-client";

export const useGetFeeForSymbol = (symbol) => {
    return useQuery(
        ['UserAssets', symbol],
        () => getFeeForSymbolFunc(symbol),
        {
            staleTime: 5000,
            refetchInterval: 10000,
        });
}

const getFeeForSymbolFunc = async (symbol) => {
    const {data} = await getFeeForSymbol(symbol)
    return data;

}

