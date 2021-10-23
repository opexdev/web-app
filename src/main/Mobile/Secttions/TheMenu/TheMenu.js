import React from "react";
import classes from "./TheMenu.module.css";
import * as Routes from "../../../../routes/routes";
import Icon from "../../../../components/Icon/Icon";
import {NavLink} from "react-router-dom";
import {MobileDashboard, Overview} from "../../../../routes/routes";


const TheMenu = () => {

    return (
        <div className={`container ${classes.container} column jc-around ai-center pt-1`}>

            <NavLink
                to={Routes.Overview}
                activeClassName={classes.selected}
                className={`width-50 row jc-between ai-center py-1`}
                isActive={(match, location) => {
                    if (location.pathname.includes("/dashboard")) {
                        return true;
                    }
                    return false
                }}
            >
                <Icon iconName="icon-market font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>بازار</span>
            </NavLink>
            <NavLink
                exact={true}
                to={Routes.Wallet}
                activeClassName={classes.selected}
                className={`width-50 row jc-between ai-center py-1`}
            >
                <Icon iconName="icon-safe font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>کیف پول</span>
            </NavLink>
            {/*<NavLink
                exact={true}
                to={Routes.Technical}
                activeClassName={classes.selected}
            >
                <div className={`row ai-center`}>
                    <Icon iconName="icon-account font-size-lg-plus"/>
                    <span className={`font-size-sm`}>تکنیکال</span>
                </div>
            </NavLink>*/}
            <NavLink
                exact={true}
                to={Routes.Settings}
                activeClassName={classes.selected}
                className={`width-50 row jc-between ai-center py-1`}
            >
                <Icon iconName="icon-settings font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>تنظیمات</span>
            </NavLink>
            {/*<NavLink
                exact={true}
                to={Routes.Dashboard}
                activeClassName={classes.selected}
            >
                <div className={`row ai-center`}>
                    <Icon iconName="icon-messages-dotted font-size-lg-plus"/>
                    <span className={`font-size-sm`}>پیام ها</span>
                </div>

            </NavLink>*/}

        </div>
    );
};

export default TheMenu;
