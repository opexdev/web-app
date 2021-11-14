import axios from "axios";
import {apiBaseUrl} from "../../../../../../../constants/global";

const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const sendWithdrawReq = async (token, amount, currency, address, fee, network) => {

    console.log("fee :", fee)

    const params = new URLSearchParams();
    params.append('fee', fee);
    params.append('destCurrency', currency.toLowerCase());
    params.append('destAddress', address);
    params.append('destNetwork', network);

    Wallet.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    Wallet.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    return await Wallet.post(`/wallet/withdraw/${amount}_${currency.toLowerCase()}`, params
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getDepositAddress = async (token, currency) => {

    Wallet.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Wallet.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    return await Wallet.get(`sapi/v1/capital/deposit/address?coin=${currency.toLowerCase()}&timestamp=${Date.now()}`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}


export const getDeposit = async (token , currency ) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('coin', currency.toLowerCase());
    params.append('timestamp', timestamp.toString());

    return await Wallet.get(`/sapi/v1/capital/deposit/hisrec?${params.toString()}`, {
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

export const getWithdraw = async (token , currency ) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('coin', currency.toLowerCase());
    params.append('timestamp', timestamp.toString());

    return await Wallet.get(`/sapi/v1/capital/withdraw/history?${params.toString()}`, {
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
