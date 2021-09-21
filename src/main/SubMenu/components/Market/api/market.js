import axios from "axios";
import {apiBaseUrl} from "../../../../../constants/global";

const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const getExchange = async () => {
    return await Wallet.get(`/api/v3/exchangeInfo`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}

export const getPrice = async () => {
    return await Wallet.get(`/api/v3/ticker/price`)
        .then((res) => {
            return res;
        }).catch((e) => {
            if (!e.response) {
                return false;
            }
            return e.response;
        })
}