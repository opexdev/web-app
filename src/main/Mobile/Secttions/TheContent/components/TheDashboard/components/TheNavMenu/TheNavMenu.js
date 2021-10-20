import React from "react";
import classes from "./TheNavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../../../routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";
import {LastTrades, MyOrder, Order, OrderBook, Overview} from "../../../../../../../../routes/routes";


const TheNavMenu = () => {

    return (
        <div className={`container ${classes.container} row ai-center`}>

            <NavLink
                exact={true}
                to={Routes.Overview}
                activeClassName={classes.selected}
                className={`col-20 column jc-center ai-center`}
            >
                <Icon iconName="icon-overview font-size-lg"/>
                <span className={`font-size-sm`}>نمای کلی</span>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.OrderBook}
                activeClassName={classes.selected}
                className={`col-20 column jc-center ai-center`}
            >
                <Icon iconName="icon-orderbook font-size-lg"/>
                <span className={`font-size-sm`}>پیشنهادات</span>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Order}
                activeClassName={classes.selected}
                className={`col-20 column jc-center ai-center`}
            >
                <Icon iconName="icon-order font-size-lg"/>
                <span className={`font-size-sm`}>سفارش</span>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.MyOrder}
                activeClassName={classes.selected}
                className={`col-20 column jc-center ai-center`}
            >
                <Icon iconName="icon-myorder font-size-lg"/>
                <span className={`font-size-sm`}>تراکنش ها</span>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.LastTrades}
                activeClassName={classes.selected}
                className={`col-20 column jc-center ai-center`}
            >
                <Icon iconName="icon-lasttrades font-size-lg"/>
                <span className={`font-size-sm`}>اخیر</span>
            </NavLink>


        </div>
    );
};

export default TheNavMenu;
