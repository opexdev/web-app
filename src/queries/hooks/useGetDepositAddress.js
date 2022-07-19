import axios from "axios";
import {useQuery} from "react-query";

export const useGetDepositAddress = (currency) => {
    return useQuery(
        ['depositAddress', currency],
        () => getDepositAddress(currency),
        {
            refetchOnMount: false,
        });
}

const getDepositAddress = async (currency) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', Date.now().toString());
    const {data} = await axios.get(`/sapi/v1/capital/deposit/address?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
    return data;
}