import axios from "axios";
import {apiBaseUrl} from "../../../../../constants/global";

const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const getOverview = async (activePair,period) => {

    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    return await Wallet.get(`/api/v3/ticker/${period}?${params.toString()}`, {
        data:params,
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })

}
