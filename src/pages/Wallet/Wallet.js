import React from "react";

import DepositWithdraw from "./components/DepositWithdraw/DepositWithdraw";
import DepositWithdrawTx from "./components/DepositWithdrawTx/DepositWithdrawTx";
import OrdersTrades from "./components/OrdersTrades/OrdersTrades";
import OrdersTradesFilter from "./components/OrdersTradesFilter/OrdersTradesFilter";

const Wallet = (props) => {
  return (
    <div className="px-1 py-1">
      <div className="row">
        <DepositWithdraw />
      </div>
      <div className="row">
        <DepositWithdrawTx />
      </div>
      <div className="row">
        <OrdersTradesFilter />
      </div>
    </div>
  );
};

export default Wallet;
