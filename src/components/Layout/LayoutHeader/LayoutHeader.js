import React, {useState} from 'react';
import classes from './LayoutHeader.module.css';
import {useTranslation} from "react-i18next";
import {Link, NavLink, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import * as RoutesName from "../../../main/Browser/Routes/routes";
import {Login} from "../../../main/Browser/Routes/routes";
import {toAbsoluteUrl} from "../../../utils/utils";
import {images} from "../../../assets/images";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "js-api-client";
import {toast} from "react-hot-toast";
import {setLogoutInitiate} from "../../../store/actions";


import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import Icon from "../../Icon/Icon";

const LayoutHeader = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    const location = useLocation();

    const interval = useSelector((state) => state.global.marketInterval)

    const [visible, setVisible] = useState(false);

    const onVisibleChange = (visible) => {

        setVisible(visible)
        /*this.setState({
            visible,
        });*/
    }
    let selected = [];

    const saveSelected = ({ selectedKeys }) => {
        return selected = selectedKeys;
    }

    const confirm = () => {
        setVisible(false)

       /* this.setState({
            visible: false,
        });*/
    }


    const logOutHandler = async () => {
        logout().then(() => {
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(() => {
            toast.error(t("header.logOutError"));
        })
    }


    const menu = (
        <Menu
            style={{
                width: "100%",
                padding: "1vh 0"
            }}
            multiple
            onSelect={()=>saveSelected()}
            onDeselect={()=>saveSelected()}
        >

            <div className={`${classes.dropBox} column jc-center ai-center py-3  width-92 m-auto`}>
                <Icon
                    iconName={`text-white flex`}
                    customClass={`${classes.icon}  icon-user-circle-o flex mb-1`}
                />
                <p className={`mt-1 ${classes.title} text-center fs-0-9`}>
                    {firstName + " " + lastName}
                </p>
            </div>

            <div className={`my-3 px-1 menuItem cursor-pointer hover-text fs-0-8`} onClick={()=>navigate(RoutesName.TxHistory)}>{t("txHistory.title")}</div>
            <div className={`my-3 px-1 menuItem cursor-pointer hover-text fs-0-8`} onClick={()=>navigate(RoutesName.Settings)}>{t("settings.title")}</div>
            <div className={`my-3 px-1 menuItem cursor-pointer hover-text fs-0-8 text-red`} onClick={logOutHandler}>{t("signOut")}</div>
        </Menu>
    );

    return (
        <div className={`width-100 flex jc-center ai-center ${classes.container}`}>
            <div className={`${classes.content} width-90 height-100 row jc-center ai-center`}>
                <Link to={RoutesName.Landing} className={`flex jc-start ai-center width-15`}>
                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus`}/>
                </Link>
                <div className={`width-30 `}>
                    <Routes>
                        <Route path={RoutesName.Landing} element={<h2>{t("Landing.title")}</h2>}/>
                        <Route path={RoutesName.EasyTrading} element={<h2>{t("MarketTitle.easyTrading")}</h2>}/>
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
                <div className={`width-35 text-center row jc-end ai-center`}>

                    <NavLink
                        to={RoutesName.Landing}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("home")}</NavLink>
                     <NavLink
                        to={RoutesName.EasyTrading}
                        className={({ isActive }) => isActive ? 'text-orange mx-1 cursor-pointer hover-text' : 'mx-1 cursor-pointer hover-text'}
                    >{t("MarketTitle.easyTrading")}</NavLink>
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

                        <>
                            {/*<p className="">
                                {firstName + " " + lastName}
                            </p>*/}

                            <Dropdown
                                trigger={['click']}
                                onVisibleChange={()=>onVisibleChange()}
                                visible={visible}
                                closeOnSelect={false}
                                overlay={menu}
                                animation="slide-up"
                            >
                                <button className={`button ${classes.thisButton} flex jc-end ai-center cursor-pointer width-85 fs-01`}>
                                    <p className={`ml-1 ${classes.name}`}>
                                        {firstName + " " + lastName}
                                    </p>
                                    <Icon
                                        iconName={`${classes.iconInfo} text-white fs-0-7 flex`}
                                        customClass="icon-down-open-1 flex"
                                    />
                                </button>

                            </Dropdown>
                        </>

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
