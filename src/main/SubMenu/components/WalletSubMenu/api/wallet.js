import axios from "axios";
import {apiBaseUrl} from "../../../../../constants/global";

const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const getAccount = async (token) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('timestamp', timestamp.toString());
    params.append('c', "");

    return await Wallet.get(`/api/api/v3/account?timestamp=${timestamp.toString()}&c`, {
        data:params,
        headers : {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/x-www-form-urlencoded'
        },
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })

}