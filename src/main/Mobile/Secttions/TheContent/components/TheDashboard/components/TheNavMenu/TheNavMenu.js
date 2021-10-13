import React from "react";
import classes from "./TheNavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../../../routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";


const TheNavMenu = () => {

    return (
        <div className={`container ${classes.container} row jc-between ai-center px-7`}>

            <NavLink
                exact={true}
                to={Routes.Dashboard}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-overview font-size-lg"/>
                    <span className={`font-size-sm-mini`}>نمای کلی</span>
                </div>

            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Wallet}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-orderbook font-size-lg"/>
                    <span className={`font-size-sm-mini`}>پیشنهادات</span>
                </div>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Technical}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-order font-size-lg"/>
                    <span className={`font-size-sm-mini`}>سفارش</span>
                </div>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Settings}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-myorder font-size-lg"/>
                    <span className={`font-size-sm-mini`}>تراکنش ها</span>
                </div>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Dashboard}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-lasttrades font-size-lg"/>
                    <span className={`font-size-sm-mini`}>اخیر</span>
                </div>

            </NavLink>


        </div>
    );
};

export default TheNavMenu;
