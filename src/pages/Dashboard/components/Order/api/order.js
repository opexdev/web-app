import axios from "axios";
import {apiBaseUrl} from "../../../../../constants/global";

const Order = axios.create({
    baseURL: apiBaseUrl,
});

export const createOrder = async (activePair , side , token , order) => {
    const timestamp = Date.now()

    const params = new URLSearchParams();
    params.append('symbol', activePair);
    params.append('side', side);
    params.append('type', "LIMIT");
    params.append('timeInForce', "GTC");
    params.append('timestamp', timestamp.toString());
    params.append('quantity', order.reqAmount);
    params.append('price', order.pricePerUnit);

    Order.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    Order.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    return await Order.post(`/api/v3/order?${params.toString()}` ,params).then((res) => {
        return res;
    }).catch((e) => {
        if (!e.response) {
            return false;
        }
        return e.response;
    })
}