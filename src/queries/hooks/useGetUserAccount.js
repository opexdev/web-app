import axios from "axios";
import {useQuery} from "react-query";

export const useGetUserAccount = () => {
    return useQuery(
        ['userAccount'], getUserAccount, {
        });
}

export const getUserAccount = async () => {
    const params = new URLSearchParams();
    params.append('timestamp', Date.now().toString());
    const {data} = await axios.get(`/api/v3/account?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
    return parseWalletsResponse(data);
}

export const parseWalletsResponse = (res) => {
    let wallets = {}
    res.balances?.forEach((wallet) => {
        wallets[wallet.asset.toUpperCase()] = {
            free: parseFloat(wallet.free.toFixed(6)),
            locked: parseFloat(wallet.locked.toFixed(6)),
            withdraw: parseFloat(wallet.withdraw.toFixed(6)),
        }
    })
    delete res.balances;
    return {
        ...res,
        wallets: wallets,
    };
}
