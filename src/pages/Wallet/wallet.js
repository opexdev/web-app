import React from "react";

import DepositWithdraw from "./DepositWithdraw/DepositWithdraw";
import DepositWithdrawTx from "./DepositWithdrawTx/DepositWithdrawTx";
import OrdersTrades from "./OrdersTrades/OrdersTrades";

const Wallet = (props) => {
    return (
        <div className="px-1 py-1">
            <div className="row">
                <DepositWithdraw/>
            </div>
            <div className="row">
                <DepositWithdrawTx/>
            </div>
            <div className="row">
                <OrdersTrades/>
            </div>
        </div>
    )
}

export default Wallet;