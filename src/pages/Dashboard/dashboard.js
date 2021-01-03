import {Fragment} from "react";
import Overview from "./Overview/Overview";
import {connect} from "react-redux";
import Order from "./Order/Order";
import OrderBook from "./OrderBook/OrderBook";
import MyOrders from "./MyOrders/MyOrders";
import LastTrades from "./LastTrades/LastTrades";

const Dashboard = (props) => {
    const OverViewData = {
        lastDay: {change: "5%", min: 100, max: 10000, volume: 500000, type: true},
        lastWeek: {change: "2.3%", min: 50, max: 20000, volume: 500000, type: true},
        lastMonth: {change: "1.4%", min: 300, max: 10000, volume: 5050000, type: false},
    }
    return (
        <Fragment>
            <div className="row">
                <div className="column px-1 py-1 col-35">
                    <Overview data={OverViewData} activePair={props.activePair}/>
                    <Order/>
                </div>
                <div className="column pl-1 py-1 col-65">
                    <OrderBook/>
                    <OrderBook/>
                </div>
            </div>
            <div className="row">
                <div className="column px-1 py-1 col-65">
                    <MyOrders/>
                </div>
                <div className="column pl-1 py-1 col-35">
                    <LastTrades/>
                </div>
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Dashboard);