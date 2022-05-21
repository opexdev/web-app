import React, {Fragment} from "react";
import Overview from "./components/Overview/Overview";
import {connect} from "react-redux";
import Order from "./components/Order/Order";
import OrderBook from "./components/OrderBook/OrderBook";
import MyOrders from "./components/MyOrders/MyOrders";
import LastTrades from "./components/LastTrades/LastTrades";
import TradingView from "./components/TradingView/TradingView";

const Dashboard = () => {
    return (
        <Fragment>
            <div className="row px-1 py-1">
                <div className="column col-35 pl-05">
                    <Overview/>
                    <Order/>
                </div>
                <div className="column col-65 pr-05">
                    <TradingView/>
                    <OrderBook/>
                </div>
            </div>
            <div className="row px-1 ">
                <div className="column col-55 pl-05">
                    <MyOrders/>
                </div>
                <div className="column col-45 pr-05">
                    <LastTrades/>
                </div>
            </div>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
    };
};

export default connect(mapStateToProps, null)(Dashboard);
