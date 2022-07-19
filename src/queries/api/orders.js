import axios from "axios";

export const createOrder = async (symbol, side, order,type = "LIMIT" ) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('side', side);
    params.append('type', type);
    params.append('timeInForce', "GTC");
    params.append('timestamp', Date.now().toString());
    params.append('quantity', order.reqAmount.toString());
    params.append('price', order.pricePerUnit.toString());
    return axios.post(`/api/v3/order`, null, {
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const cancelOrderByOrderID = (symbol, orderId) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('orderId', orderId);
    params.append('timestamp', Date.now().toString());

    return axios.delete(`/api/v3/order?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    })
}
