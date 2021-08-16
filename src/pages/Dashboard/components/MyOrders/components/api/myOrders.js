import axios from "axios";
import {apiBaseUrl} from "../../../../../../constants/global";

const myOrder = axios.create({
    baseURL: apiBaseUrl,
});

export const getOpenOrder = async (activePair, token ) => {
    const timestamp = Date.now()
    const symbol = (activePair.base+"_"+activePair.quote).toLowerCase();

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', timestamp.toString());

    return await myOrder.get(`/api/v3/openOrders?${params.toString()}`, {
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