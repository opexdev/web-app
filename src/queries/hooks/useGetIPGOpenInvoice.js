import {useQuery} from "@tanstack/react-query";
import {getIpgOpenInvoice} from "js-api-client";

export const useGetIpgOpenInvoice = () => {
    return useQuery(
        ['ipgOpen'],
        () => getIpgOpenInvoiceFunc(),
        {
            retry: 1,
            notifyOnChangeProps: ['data', 'isLoading', 'error']
        });
}

const getIpgOpenInvoiceFunc = async () => {
    const {data} = await getIpgOpenInvoice()
    return data
}