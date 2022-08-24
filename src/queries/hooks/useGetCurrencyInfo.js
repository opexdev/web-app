import {useQuery} from "@tanstack/react-query";
import {getCurrencyInfo} from "js-api-client";

export const useGetCurrencyInfo = (currency) => {
    return useQuery(
        ['currencyInfo', currency],
        () => getCurrencyInfoFunc(currency),
        {
            select: (data) => data[0]
        }
       );
}

const getCurrencyInfoFunc = async (currency) => {
    const {data} = await getCurrencyInfo(currency)
    return data;

}

