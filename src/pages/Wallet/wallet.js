import React from "react";
import {connect} from "react-redux";
import Deposit from "./Deposit/Deposit";
import DepositTransactions from "./DepositTransactions/DepositTransactions";
import OrdersTrades from "./OrdersTrades/OrdersTrades";


const Wallet = (props) => {
    return (
        <div className="px-1 py-1">
            <div className="row">
                <Deposit/>
            </div>
            <div className="row">
                <DepositTransactions/>
            </div>
            <div className="row">
                <OrdersTrades/>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Wallet);