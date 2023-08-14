import React from 'react';
import classes from './LayoutHeader.module.css';
import {useTranslation} from "react-i18next";
import {Link, NavLink, Route, Routes, useLocation, useParams} from "react-router-dom";
import * as RoutesName from "../../../main/Browser/Routes/routes";
import {Commission, Login} from "../../../main/Browser/Routes/routes";
import {toAbsoluteUrl} from "../../../utils/utils";
import Clock from "../../../main/Browser/Pages/UserPanel/Sections/Header/components/Clock/Clock";
import {images} from "../../../assets/images";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "js-api-client";
import {toast} from "react-hot-toast";
import {setLogoutInitiate} from "../../../store/actions";
import AboutUs from "../../../main/Browser/Pages/Info/AboutUs/AboutUs";

const LayoutHeader = () => {
    const {t} = useTranslation();

    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    const location = useLocation();

    const interval = useSelector((state) => state.global.marketInterval)

    const logOutHandler = async () => {
        logout().then(() => {
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(() => {
            toast.error(t("header.logOutError"));
        })
    }

    return (
        <div className={`width-100 flex jc-center ai-center ${classes.container}`}>
            <div className={`${classes.content} width-90 height-100 row jc-center ai-center`}>
                <Link to={RoutesName.Landing} className={`flex jc-start ai-center width-20`}>
                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus`}/>
                </Link>
                <div className={`width-45 `}>
                    <Routes>
                        <Route path={RoutesName.Landing} element={<h2>{t("Landing.title")}</h2>}/>
                        <Route path={RoutesName.Commission} element={<h2>{t("commissions.title")}</h2>}/>
                        <Route path={RoutesName.AboutUs} element={<h2>{t("aboutUs.title")}</h2>}/>
                        <Route path={RoutesName.TransferFees} element={<h2>{t("transferFees.title")}</h2>}/>
                        <Route path={RoutesName.Guide} element={<h2>{t("guide.title")}</h2>}/>
                        <Route path={RoutesName.Rules} element={<h2>{t("rules.title")}</h2>}/>
                        <Route path={RoutesName.ContactUs} element={<h2>{t("contactUs.title")}</h2>}/>
                        <Route path={RoutesName.AllMarket} element={<div className={`row jc-start ai-baseline`}>
                            <h2 className={`ml-025`}>{t("market.title")}</h2>
                            <span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>
                        </div>}/>
                    </Routes>
                </div>
                <div className={`width-45 text-center row jc-end ai-center`}>

                    <NavLink
                        to={RoutesName.Landing}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("home")}</NavLink>
                    {/* <NavLink
                        to="#"
                        className={`mx-1 cursor-pointer hover-text`}
                    >{t("MarketTitle.easyTrading")}</NavLink>*/}
                    <NavLink
                        to={RoutesName.Panel}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("MarketTitle.advancedTrading")}</NavLink>
                    <NavLink
                        to={RoutesName.AllMarket}
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
                    {/*<p style={{direction: "ltr"}}>
                        <Clock/>
                    </p>*/}

                </div>

                <div className={`flex jc-end ai-center width-5`}>
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
        </div>
    );
};

export default LayoutHeader;
