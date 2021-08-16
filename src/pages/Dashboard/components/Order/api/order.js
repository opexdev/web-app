import axios from "axios";
import {apiBaseUrl} from "../../../../../constants/global";

const Order = axios.create({
    baseURL: apiBaseUrl,
});

export const createOrder = async (activePair , side , token , order) => {
    const timestamp = Date.now()


    // symbol:btc_usdt
    // side:SELL
    // type:LIMIT
    // timeInForce:GTC
    // timestamp:1626805452
    // quantity:10
    // price:1

    const params = new URLSearchParams();
    params.append('symbol', activePair);
    params.append('side', side);
    params.append('type', "LIMIT");
    params.append('timeInForce', "GTC");
    params.append('timestamp', timestamp.toString());
    params.append('quantity', order.reqAmount);
    params.append('price', order.pricePerUnit);


    console.log("params : " , params.toString())


    return await Order.post(`/api/v3/order?${params.toString()}`, {
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