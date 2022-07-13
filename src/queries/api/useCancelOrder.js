import axios from "axios";

export const cancelOrderByOrderID = (symbol ,orderId) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('orderId', orderId);
    params.append('timestamp', Date.now().toString());

    return axios.delete(`/api/v3/order?${params.toString()}`, {
        data:params,
        headers : {
            'content-type': 'application/x-www-form-urlencoded'
        },
    })

}