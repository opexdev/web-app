import React from 'react';
import classes from './HeaderBuilder.module.css'
import {Link, NavLink, useLocation} from "react-router-dom";
import * as Routes from "../../main/Browser/Routes/routes";
import {Login} from "../../main/Browser/Routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import {images} from "../../assets/images";
import {setLogoutInitiate} from "../../store/actions";
import Clock from "../../main/Browser/Pages/UserPanel/Sections/Header/components/Clock/Clock";
import {logout} from "js-api-client";
import {toAbsoluteUrl} from "../../utils/utils";

const HeaderBuilder = ({children}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    let location = useLocation();

    const logOutHandler = async () => {
        logout().then(() => {
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(() => {
            toast.error(t("header.logOutError"));
        })
    }


    return (
        <div className={`${classes.container} container row jc-between ai-center px-2`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <div className={`flex jc-start ai-center  width-35`}>
                    <Link to={Routes.Landing} className={`flex jc-start ai-center`}>
                        <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus`}/>
                    </Link>

                    <span className={`mr-2`}>{children}</span>

                </div>
                <div className={`width-45 text-center row jc-center ai-center`}>

                    <NavLink
                        to={Routes.Landing}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("home")}</NavLink>
                    <NavLink
                        to="#"
                        className={`mx-1 cursor-pointer hover-text`}
                    >{t("MarketTitle.easyTrading")}</NavLink>
                    <NavLink
                        to={Routes.Panel}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("MarketTitle.advancedTrading")}</NavLink>
                    <NavLink
                        to={Routes.AllMarket}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("market.title")}</NavLink>

                </div>
                <div className={`column ai-end width-15`}>
                    {firstName === null ? (
                        <Link to={Login} state={{from: location}} className="hover-text">
                            <p>{t("signIn")} | {t("signUp")}</p>
                        </Link>
                    ) : (
                        <p className="mb-05">
                            {firstName + " " + lastName}
                        </p>
                    )}
                    <p style={{direction: "ltr"}}>
                        <Clock/>
                    </p>

                </div>
            </div>
            <div className={`flex jc-end ai-center ${classes.signOut}`}>
                {isLogin ? (
                    <img
                        className="img-md-plus cursor-pointer"
                        src={images.signOut}
                        alt={t("signOut")}
                        onClick={logOutHandler}
                        data-tooltip-place="right"
                        data-tooltip-id="opex-tooltip"
                        data-tooltip-float={true}
                        data-tooltip-html={`<span class="column jc-between col-100">${t("signOut")}</span>`}
                    />
                ) : (
                    <Link to={Login} state={{from: location}} className="flex">
                        <img
                            className="img-md-plus cursor-pointer"
                            src={images.signIn}
                            data-tooltip-html={`<span class="column jc-between col-100">${t("signIn")}</span>`}
                            alt={t("signIn")}
                            data-tooltip-id="opex-tooltip"
                            data-tooltip-place="right"
                        />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HeaderBuilder;