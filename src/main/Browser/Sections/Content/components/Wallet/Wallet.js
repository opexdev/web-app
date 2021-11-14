import React from "react";

import DepositWithdraw from "./components/DepositWithdraw/DepositWithdraw";
import DepositWithdrawTx from "./components/DepositWithdrawTx/DepositWithdrawTx";
import OrdersTradesFilter from "./components/OrdersTradesFilter/OrdersTradesFilter";
import {Route, Switch} from "react-router-dom";
import {Wallet as walletRoute} from "../../../../../../routes/routes";

const Wallet = () => {
    return (
        <Switch>
            <Route exact path={walletRoute + "/:id"}>
                <div className="px-1 py-1">
                    <div className="row">
                        <DepositWithdraw/>
                    </div>
                    <div className="row">
                        <DepositWithdrawTx/>
                    </div>
                    {/*<div className="row">
                        <OrdersTradesFilter/>
                    </div>*/}
                </div>
            </Route>
        </Switch>
    );
};

export default Wallet;
