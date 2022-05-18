import axios from "axios";

export const sendWithdrawReq = async (amount, currency, address, fee, network) => {
    const params = new URLSearchParams();
    params.append('fee', fee);
    params.append('destCurrency', currency.toUpperCase());
    params.append('destAddress', address);
    params.append('destNetwork', network);
    return await axios.post(`/wallet/withdraw/${amount}_${currency.toUpperCase()}`, null,
        {
            params,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
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
    return await axios.get(`sapi/v1/capital/deposit/address?coin=${currency.toUpperCase()}&timestamp=${Date.now()}`, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
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


export const getDeposit = async (currency) => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', timestamp.toString());
    return await axios.get(`/sapi/v1/capital/deposit/hisrec?${params.toString()}`, {
        data: params,
        headers: {
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

export const getWithdraw = async (currency) => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', timestamp.toString());
    return await axios.get(`/sapi/v1/capital/withdraw/history?${params.toString()}`, {
        data: params,
        headers: {
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

export const sendIRTDepositReq = async (amount) => {
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
    return await axios.post(`/ipg/v1/payment/request`, payload
    ).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
export const verifyIRTDepositReq = async (paymentToken, paymentStatus) => {
    const params = new URLSearchParams();
    params.append('status', paymentStatus);
    return await axios.post(`/ipg/v1/payment/verify/${paymentToken}?${params.toString()}`, {data: params}).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const getAllPayments = async () => {
    const params = new URLSearchParams();
    return await axios.get(`/ipg/v1/invoice`, {data: params}).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
export const getOpenPayments = async () => {
    const params = new URLSearchParams();
    return await axios.get(`/ipg/v1/invoice/open`, {data: params}).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}

export const cancelIRTDepositReq = async (reference) => {
    return await axios.post(`/ipg/v1/payment/cancel/${reference}`).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}
