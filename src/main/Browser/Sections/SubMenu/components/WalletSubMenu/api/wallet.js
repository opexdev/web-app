import axios from "axios";

export const getAccount = () => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('timestamp', timestamp.toString());

    return axios.get(`/api/v3/account?timestamp=${timestamp.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
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