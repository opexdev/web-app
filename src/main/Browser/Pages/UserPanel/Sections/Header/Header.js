import React, {useEffect} from "react";
import classes from "./Header.module.css";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import * as RoutesName from "../../../../Routes/routes";
import {Login} from "../../../../Routes/routes";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import ReactTooltip from "react-tooltip";
import SettingHeader from "./components/SettingsHeader/SettingsHeader";
import ProtectedRoute from "../../../../../../components/ProtectedRoute/ProtectedRoute";
import {images} from "../../../../../../assets/images";
import {setLogoutInitiate} from "../../../../../../store/actions";
import {toast} from "react-hot-toast";
import Clock from "./components/Clock/Clock";
import {logout} from "js-api-client";

const Header = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    let location = useLocation();

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = () => {
        logout().then(()=>{
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(()=>{
            toast.error(t("header.logOutError"));
        })
    }

    return (
        <div className={`width-100 row jc-between ai-center px-1 py-1 ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <Routes>
                    <Route path="/" element={<MarketHeader/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.WalletRelative + "/:id"} element={<WalletHeader/>}/>
                        <Route path={RoutesName.SettingsRelative+"/*"} element={<SettingHeader/>}/>
                    </Route>
                    <Route path="*" element={<h4>{t("comingSoon")}</h4>}/>
                </Routes>
                <div className={`col-25 column ai-end`}>
                    {firstName === null ? (
                        <Link to={Login} state={{from: location}} className="hover-text mb-05">
                            <p>{t("pleaseLogin")}</p>
                        </Link>
                    ) : (
                        <p className="mb-05">
                            {firstName + " " + lastName}
                        </p>
                    )}
                    <p className={`mt-05`} style={{direction: "ltr"}}>
                        <Clock/>
                    </p>
                </div>
            </div>
            <div className={`flex jc-end ai-center ${classes.signOut}`}>
                {isLogin ? (
                    <img
                        className="img-md-plus"
                        src={images.signOut}
                        alt={t("signOut")}
                        onClick={logOutHandler}
                        data-html={true}
                        data-place="right"
                        data-effect="float"
                        data-tip={`<span class="column jc-between col-100">${t("signOut")}</span>`}
                    />
                ) : (
                    <Link to={Login} state={{from: location}} className="flex">
                        <img
                            className="img-md-plus"
                            src={images.signIn}
                            alt={t("signIn")}
                            data-html={true}
                            data-place="right"
                            data-effect="float"
                            data-tip={`<span class="column jc-between col-100">${t("signIn")}</span>`}
                        />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;