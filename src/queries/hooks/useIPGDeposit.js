import axios from "axios";
import {useQuery} from "react-query";

export const useIPGDeposit = () => {
    return useQuery(
        ['IPGDepositTxs'], getIPGDeposit,
        {
            refetchOnMount: true,
            staleTime: 5000,
            enabled: false
        });
}

const getIPGDeposit = async () => {
    const {data} = await axios.get(`/ipg/v1/invoice`)
    return data;
}
