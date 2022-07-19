import axios from "axios";

export const sendWithdrawReq = async (amount, currency, address, fee, network) => {
    const params = new URLSearchParams();
    params.append('fee', fee);
    params.append('destCurrency', currency.toUpperCase());
    params.append('destAddress', address);
    params.append('destNetwork', network);
    return axios.post(`/wallet/withdraw/${amount}_${currency.toUpperCase()}`, null,
        {
            params,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }
    )
}
