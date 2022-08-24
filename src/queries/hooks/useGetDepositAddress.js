import {useQuery} from "@tanstack/react-query";
import {getDepositAddress} from "js-api-client";

export const useGetDepositAddress = (currency) => {
    return useQuery(
        ['depositAddress', currency],
        () => getDepositAddressFunc(currency),
        {
            retry: 1,
            refetchOnMount: false,
            staleTime: 30*60*1000
        });
}

const getDepositAddressFunc = async (currency) => {
    const {data} = await getDepositAddress(currency)
    return data;
}