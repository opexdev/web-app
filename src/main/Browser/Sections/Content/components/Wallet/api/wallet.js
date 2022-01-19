import axios from "axios";
import {apiBaseUrl} from "../../../../../../../constants/global";

const Wallet = axios.create({
    baseURL: apiBaseUrl,
});

export const sendWithdrawReq = async (token, amount, currency, address, fee, network) => {

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

export const sendIRTDepositReq = async (token, amount) => {

    const payload = {
        "amount": amount,
        "currency": "RIALS",
        "callbackUrl": "https://opex.dev/demo/wallet/IRT/",
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

    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;

    return await axios.post(`https://api.opex.dev/ipg/v1/payment/verify/${paymentToken}?${params.toString()}`, {
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
