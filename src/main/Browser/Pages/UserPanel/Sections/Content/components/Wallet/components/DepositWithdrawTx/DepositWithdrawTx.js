import React from "react";
import DepositTx from "../DepositTx/DepositTx";
import WithdrawTx from "../WithdrawTx/WithdrawTx";

const DepositWithdrawTx = () => {
    return (
        <div className={`row jc-between width-100 my-2`}>
            <DepositTx/>
            <WithdrawTx/>
        </div>
    )
};

export default DepositWithdrawTx;