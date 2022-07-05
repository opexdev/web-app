import axios from "axios";

export const createOrder = async (activePair , side , order) => {
    const timestamp = Date.now()
    const params = new URLSearchParams();
    params.append('symbol', activePair.symbol);
    params.append('side', side);
    params.append('type', "LIMIT");
    params.append('timeInForce', "GTC");
    params.append('timestamp', timestamp.toString());
    params.append('quantity', order.reqAmount.toString());
    params.append('price', order.pricePerUnit.toString());
    return await axios.post(`/api/v3/order`, null , {
        params,
        headers : {
            'Content-Type':'application/x-www-form-urlencoded'
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
