import axios from "axios";
import {apiBaseUrl} from "../../../../../../../../../constants/global";


const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const getLastTrades = async (activePair) => {

    const params = new URLSearchParams();

    params.append('symbol', activePair.symbol);
    params.append('limit', "25");

    return await Wallet.get(`/api/v3/trades?${params.toString()}`, {
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
