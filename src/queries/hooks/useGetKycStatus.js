import {useQuery} from "@tanstack/react-query";
import {getKycStatus} from "js-api-client";

export const useGetKycStatus = (enabled = false) => {
    return useQuery(
        ['KycStatus'], getKycStatusFunc, {
            enabled,
            retry: 1
        });
}

export const getKycStatusFunc = async () => {
    const {data} = await getKycStatus()
    return data;
}
