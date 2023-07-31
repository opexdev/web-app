import {useQuery} from "@tanstack/react-query";
import {getDepositAddress} from "js-api-client";

export const useGetDepositAddress = (currency, network) => {
    return useQuery(
        ['depositAddress', currency, network],
        () => getDepositAddressFunc(currency, network),
        {
            retry: 1,
            refetchOnMount: false,
            staleTime: 30*60*1000,
        });
}

const getDepositAddressFunc = async (currency, network) => {
    const {data} = await getDepositAddress(currency, network)
    return data;
}