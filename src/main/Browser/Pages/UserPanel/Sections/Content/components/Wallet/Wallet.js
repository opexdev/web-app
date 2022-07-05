import React from "react";
import DepositWithdraw from "./components/DepositWithdraw/DepositWithdraw";
import DepositWithdrawTx from "./components/DepositWithdrawTx/DepositWithdrawTx";


const Wallet = () => {
    return (
        <>
            <div className="px-1 py-1">
                <div className="row">
                    <DepositWithdraw/>
                </div>
                <div className="row">
                    <DepositWithdrawTx/>
                </div>
            </div>
        </>
    );
};

export default Wallet;
