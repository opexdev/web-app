import axios from "axios";
import {useQuery} from "react-query";

export const useGetIpgOpenInvoice = () => {
    return useQuery(
        ['ipgOpen'],
        () => getIpgOpenInvoice(),
        {
            refetchOnMount: true,
        });
}

const getIpgOpenInvoice = async () => {
    const {data} = await axios.get(`/ipg/v1/invoice/open`)
    return data;
}