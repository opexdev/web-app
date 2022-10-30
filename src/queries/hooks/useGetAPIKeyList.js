import {useQuery} from "@tanstack/react-query";
import {getAPIKeyList, getLastPrices} from "js-api-client";

export const useGetAPIKeyList = () => {
    return useQuery(
        ['APIKeyList'], getAPIKeyListFunc,
        {
            retry: 1,
            initialData: []
        });
}

export const getAPIKeyListFunc = async () => {
    const {data} = await getAPIKeyList()
    return data;
}