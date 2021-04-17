import React from "react";
import Overview from "./Overview/Overview";
import {connect} from "react-redux";
import Order from "./Order/Order";
import OrderBook from "./OrderBook/OrderBook";
import MyOrders from "./MyOrders/MyOrders";
import LastTrades from "./LastTrades/LastTrades";
import {OrderData} from "../../FakeData/FakeData";
import TradingView from "./TradingView/TradingView";

const Dashboard = () => {
  return (
    <div className="px-1 py-1">
      <div className="row">
        <div className="column col-35 pl-05">
          <Overview />
          <Order data={OrderData} />
        </div>
        <div className="column col-65 pr-05">
          <TradingView />
          <OrderBook />
        </div>
      </div>
      <div className="row">
        <div className="column col-55 pl-05">
          <MyOrders />
        </div>
        <div className="column col-45 pr-05">
          <LastTrades />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.global.activePair,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
