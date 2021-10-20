import axios from "axios";
import {apiBaseUrl} from "../../../../../../../constants/global";

const wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const sendWithdrawReq = async (token, amount, currency, address, fee) => {

    wallet.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    wallet.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    return await wallet.post(`/wallet/withdraw/${amount}_${currency.toLowerCase()}`, {
        fee,
        destCurrency: currency.toLowerCase(),
        destAddress: address,
    }).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
