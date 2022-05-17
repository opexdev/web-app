import axios from "axios";

export const getAccount = (token) => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('timestamp', timestamp.toString());

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    if (token) headers.Authorization = "Bearer "+token;
    return axios.get(`/api/v3/account?timestamp=${timestamp.toString()}`, {
        data:params,
        headers
    })

}

export const parseWalletsResponse = (res) => {
    let wallets = {}
    res.balances.forEach((wallet) => {
        wallets[wallet.asset.toUpperCase()] = {
            free: parseFloat(wallet.free.toFixed(6)),
            locked:  parseFloat(wallet.locked.toFixed(6)),
            withdraw:  parseFloat(wallet.withdraw.toFixed(6)),
        }
    })
    delete res.balances;
    delete res.updateTime;
    return {
        ...res,
        wallets:wallets
    };
}