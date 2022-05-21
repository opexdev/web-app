import React, {Fragment, useState, useEffect} from "react";
import classes from "./MainMenu.module.css";
import {Link, NavLink} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../../../routes/routes";
import {useTranslation} from "react-i18next";
import MessagesSubMenu from "../SubMenu/components/MessagesSubMenu/MessagesSubMenu";
import {images} from "../../../../assets/images";
import Icon from "../../../../components/Icon/Icon";
import {useSelector} from "react-redux";

const MainMenu = () => {
    const {t} = useTranslation();
    const [showMessages, setShowMessages] = useState(false);
    const defaultWallet = useSelector((state) => state.exchange.assets[0])

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <Fragment>
            <div className={`column ai-center mainMenu-background ${classes.container}`}>
                <div className={`${classes.header} py-1`}>
                    <Link to={Routes.Dashboard} onClick={() => setShowMessages(false)}>
                        <span className="flex">
                         <img className="img-md" src={images.opexLogoOnePlus} alt={t("title")} title={t("title")} style={{height: "7.5vh"}}/>
                        </span>
                    </Link>
                </div>
                <div className={`column jc-between ai-center ${classes.content} pt-2 pb-1`}>
                    <div className={`column jc-start ai-center ${classes.topSection}`}>
                        <NavLink
                            exact={true}
                            to={Routes.Dashboard}
                            activeClassName={classes.selected}
                            onClick={() => setShowMessages(false)}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`<span class="column jc-between col-100">${t(
                                "market.title",
                            )}</span>`}>
                            <Icon iconName="icon-market font-size-lg"/>
                        </NavLink>
                        <NavLink
                            to={Routes.Wallet +"/"+ defaultWallet}
                            isActive={(match, location) => {
                                return location.pathname.includes("/wallet/") ? true : false;
                            }}
                            activeClassName={classes.selected}
                            onClick={() => setShowMessages(false)}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`<span class="column jc-between col-100">${t(
                                "wallet.title",
                            )}</span>`}>
                            <Icon iconName="icon-safe font-size-lg"/>
                        </NavLink>
                        <NavLink
                            exact={true}
                            to={Routes.Technical}
                            activeClassName={classes.selected}
                            onClick={() => setShowMessages(false)}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">${t(
                                "technical.title",
                            )}</span>`}>
                            <Icon iconName="icon-account font-size-lg"/>
                        </NavLink>
                    </div>
                    <div className={`column jc-end ai-center ${classes.bottomSection}`}>
                     <span
                         className={`text-color ${classes.messages} 
                         ${showMessages ? classes.selected : ""}`}
                         onClick={() => setShowMessages((prevState) => !prevState)}
                         data-html={true} data-place="left" data-effect="float" data-tip={`<span class="column jc-between col-100">${t("messages.title")}</span>`}><Icon iconName="icon-messages-dotted font-size-lg"/>
                     </span>
                        <NavLink
                            to={Routes.Security}
                            activeClassName={classes.selected}
                            onClick={() => setShowMessages(false)}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">${t(
                                "settings.title",
                            )}</span>`}>
                            <Icon iconName="icon-settings font-size-lg"/>
                        </NavLink>
                    </div>
                </div>
            </div>

            <Fragment>
                <div
                    className={`${classes.subMenu} ${showMessages ? classes.show : ""}`}>
                    <MessagesSubMenu/>
                </div>
                <div
                    className={`${classes.subMenuWrapper} ${
                        showMessages ? classes.show : ""
                    }`}
                    onClick={() => setShowMessages(false)}
                />
            </Fragment>
        </Fragment>
    );
};

export default MainMenu;
