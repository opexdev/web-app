import React, {useEffect} from "react";
import classes from "./MainMenu.module.css";
import {images} from "../../assets/images"
import {Link, NavLink} from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";
import *  as Routes from '../../routes/routes';


const MainMenu = (props) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <div className={`column ai-center jc-between mainMenu-background ${classes.container}`}>
            <div className={`column jc-start ai-center ${classes.tabs}`}>
                <Link  to={Routes.Dashboard}>
                    <span className="flex">
                        <img className="img-lg" src={images.opexLogo_light} alt="opexLogo_light" title="اوپکس" style={{height: "7.5vh"}}/>
                    </span>
                </Link>
                <NavLink
                    exact={true} to={Routes.Dashboard}
                    activeClassName={classes.selected}
                    data-html={true}
                    data-place="left"
                    data-effect="float"
                    data-tip='<span class="column jc-between col-100">بازار</span>'
                >
                    <Icon iconName="icon-market font-size-lg"/>
                </NavLink>
                <NavLink exact={true} to={Routes.Wallet} activeClassName={classes.selected}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={`
                         <span class="column jc-between col-100">دارایی ها</span>`}>
                    <Icon iconName="icon-wallet font-size-lg"/>
                </NavLink>
                <NavLink exact={true} to={Routes.Technical} activeClassName={classes.selected}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={`
                         <span class="column jc-between col-100">چارت</span>`}>
                    <Icon iconName="icon-account font-size-lg"/>
                </NavLink>
            </div>
            <div className={`column jc-end ai-center`}>
                <NavLink exact={true} to={Routes.Messages} activeClassName={classes.selected}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={`
                         <span class="column jc-between col-100">پیام ها</span>`}>
                    <Icon iconName="icon-messages-dotted font-size-lg"/>
                </NavLink>

                <NavLink exact={true} to={Routes.Settings}  activeClassName={classes.selected}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={`
                         <span class="column jc-between col-100">تنظیمات</span>`}>
                    <Icon iconName="icon-settings font-size-lg"/>
                </NavLink>
            </div>
        </div>
    )
};

export default MainMenu;