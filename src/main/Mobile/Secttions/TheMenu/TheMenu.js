import React from "react";
import classes from "./TheMenu.module.css";
import * as Routes from "../../../../routes/routes";
import Icon from "../../../../components/Icon/Icon";
import {NavLink} from "react-router-dom";


const TheMenu = () => {

    return (
        <div className={`container ${classes.container} row jc-around ai-center px-7`}>

            <NavLink
                exact={true}
                to={Routes.Dashboard}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-market font-size-lg"/>
                    <span className={`font-size-sm-mini`}>بازار</span>
                </div>

            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Wallet}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-safe font-size-lg"/>
                    <span className={`font-size-sm-mini`}>کیف پول</span>
                </div>
            </NavLink>
            {/*<NavLink
                exact={true}
                to={Routes.Technical}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-account font-size-lg"/>
                    <span className={`font-size-sm-mini`}>تکنیکال</span>
                </div>
            </NavLink>*/}
            <NavLink
                exact={true}
                to={Routes.Settings}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-settings font-size-lg"/>
                    <span className={`font-size-sm-mini`}>تنظیمات</span>
                </div>
            </NavLink>
            {/*<NavLink
                exact={true}
                to={Routes.Dashboard}
                activeClassName={classes.selected}
            >
                <div className={`column ai-center`}>
                    <Icon iconName="icon-messages-dotted font-size-lg"/>
                    <span className={`font-size-sm-mini`}>پیام ها</span>
                </div>

            </NavLink>*/}

        </div>
    );
};

export default TheMenu;
