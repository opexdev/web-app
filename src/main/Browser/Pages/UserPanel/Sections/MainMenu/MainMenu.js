import React, {Fragment, useState} from "react";
import classes from "./MainMenu.module.css";
import {Link, NavLink} from "react-router-dom";
import * as Routes from "../../../../Routes/routes";
import {useTranslation} from "react-i18next";
import MessagesSubMenu from "../SubMenu/components/MessagesSubMenu/MessagesSubMenu";
import Icon from "../../../../../../components/Icon/Icon";
import {toAbsoluteUrl} from "../../../../../../utils/utils";


const MainMenu = () => {
    const {t} = useTranslation();
    const [showMessages, setShowMessages] = useState(false);

    return (
        <Fragment>
            <div className={`column ai-center ${classes.container}`}>
                <div className={`${classes.header} py-1`}>
                    <Link to={Routes.Landing} onClick={() => setShowMessages(false)}>
                        <span className="flex">
                            <img src={toAbsoluteUrl('/assets/logo/logo-mini.svg')} alt={t("title")} title={t("title")} className="img-md" style={{height: "7.5vh"}}/>
                        </span>
                    </Link>
                </div>
                <div className={`column jc-between ai-center ${classes.content}  pb-2`}>
                    <div className={`column jc-start ai-center ${classes.topSection}`}>
                        {/*<NavLink
                            to={Routes.Landing}
                            className={({ isActive }) =>
                                isActive ? classes.selected : undefined
                            }
                            onClick={() => setShowMessages(false)}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="left"
                            data-tooltip-float={true}
                            data-tooltip-html={`<span class="column jc-between col-100">${t(
                                "home",
                            )}</span>`}>
                            <Icon iconName="icon-overview fs-21"/>
                        </NavLink>*/}
                        <NavLink
                            to={Routes.Panel}
                            end
                            className={({ isActive }) =>
                                isActive ? classes.selected : undefined
                            }
                            onClick={() => setShowMessages(false)}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="left"
                            data-tooltip-float={true}
                            data-tooltip-html={`<span class="column jc-between col-100">${t(
                                "market.title",
                            )}</span>`}
                        >
                            <Icon iconName="icon-market fs-21"/>
                        </NavLink>
                        <NavLink
                            to={Routes.Wallet}
                            className={({ isActive }) =>
                                isActive ? classes.selected : undefined
                            }
                            onClick={() => setShowMessages(false)}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="left"
                            data-tooltip-float={true}
                            data-tooltip-html={`<span class="column jc-between col-100">${t(
                                "wallet.title",
                            )}</span>`}>
                            <Icon iconName="icon-safe fs-21"/>
                        </NavLink>
                        <NavLink
                            to={Routes.Technical}
                            className={({ isActive }) =>
                                isActive ? classes.selected : undefined
                            }
                            onClick={() => setShowMessages(false)}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="left"
                            data-tooltip-float={true}
                            data-tooltip-html={`
                         <span class="column jc-between col-100">${t(
                                "technical.title",
                            )}</span>`}>
                            <Icon iconName="icon-account fs-21"/>
                        </NavLink>
                    </div>
                    <div className={`column jc-end ai-center ${classes.bottomSection}`}>
                     {/*<span
                         className={`text-color ${classes.messages} 
                         ${showMessages ? classes.selected : ""}`}
                         onClick={() => setShowMessages((prevState) => !prevState)}
                         data-tooltip-id="opex-tooltip" data-tooltip-place="left" data-tooltip-float={true} data-tooltip-html={`<span class="column jc-between col-100">${t("messages.title")}</span>`}><Icon iconName="icon-messages-dotted fs-21"/>
                     </span>*/}
                        <NavLink
                            to={Routes.Security}
                            className={({ isActive }) =>
                                isActive ? classes.selected : undefined
                            }
                            onClick={() => setShowMessages(false)}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="left"
                            data-tooltip-float={true}
                            data-tooltip-html={`
                         <span class="column jc-between col-100">${t(
                                "settings.title",
                            )}</span>`}>
                            <Icon iconName="icon-settings fs-21"/>
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
