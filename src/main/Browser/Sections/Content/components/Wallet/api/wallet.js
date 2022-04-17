import axios from "axios";
import {apiBaseUrl} from "../../../../../../../constants/global";

const Wallet = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const sendWithdrawReq = async (amount, currency, address, fee, network) => {

    const params = new URLSearchParams();
    params.append('fee', fee);
    params.append('destCurrency', currency.toLowerCase());
    params.append('destAddress', address);
    params.append('destNetwork', network);


    return await axios.post(`/wallet/withdraw/${amount}_${currency.toLowerCase()}`, params ,{
        headers : {
            "Content-Type" : 'application/x-www-form-urlencoded'
        }
    }
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getDepositAddress = async (currency) => {


    return await axios.get(`sapi/v1/capital/deposit/address?coin=${currency.toLowerCase()}&timestamp=${Date.now()}` ,{
        headers : {
            "Content-Type" : 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
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

export const sendIRTDepositReq = async (token, amount) => {

    const origin = window.location.origin

    const payload = {
        "amount": amount,
        "currency": "RIALS",
        "callbackUrl": `${origin}/wallet/IRT/`,
        //"paymentGatewayName": "VandarPaymentService",
        "description": "test",
        "mobile": null,
        "cardNumber": null,
        "nationalCode": null
    }

    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;

    return await Wallet.post(`/ipg/v1/payment/request`, payload
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
export const verifyIRTDepositReq = async (token , paymentToken , paymentStatus) => {

    const params = new URLSearchParams();
    params.append('status', paymentStatus);

    return await Wallet.post(`/ipg/v1/payment/verify/${paymentToken}?${params.toString()}`, {
        data:params,
        headers : {
            'Authorization': `Bearer ${token}`,
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

export const getAllPayments = async (token) => {

    const params = new URLSearchParams();

    return await Wallet.get(`/ipg/v1/invoice`, {
        data:params,
        headers : {
            'Authorization': `Bearer ${token}`,
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
export const getOpenPayments = async (token) => {

    const params = new URLSearchParams();

    return await Wallet.get(`/ipg/v1/invoice/open`, {
        data:params,
        headers : {
            'Authorization': `Bearer ${token}`,
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

export const cancelIRTDepositReq = async (token, reference) => {

    Wallet.defaults.headers.post['Authorization'] = `Bearer ${token}`;

    return await Wallet.post(`/ipg/v1/payment/cancel/${reference}`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
