import axios from "axios";

export const sendIPGDepositReq = (amount) => {
    const origin = window.location.origin
    const payload = {
        "amount": amount,
        "currency": "RIALS",
        "callbackUrl": `${origin}/panel/wallet/IRT`,
        "description": "test",
        "mobile": null,
        "cardNumber": null,
        "nationalCode": null
    }
    return axios.post(`/ipg/v1/payment/request`, payload)
}

export const verifyIPGDepositReq = (paymentToken, paymentStatus) => {
    const params = new URLSearchParams();
    params.append('status', paymentStatus);
    return axios.post(`/ipg/v1/payment/verify/${paymentToken}?${params.toString()}`, {data: params})
}

export const getIPGInvoice = () => {
    return axios.get(`/ipg/v1/invoice`)
}

export const cancelIPGDepositReq = async (reference) => {
    return axios.post(`/ipg/v1/payment/cancel/${reference}`)
}
