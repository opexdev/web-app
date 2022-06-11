import React, {useEffect} from "react";
import classes from "./Header.module.css";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Link, Route, Routes} from "react-router-dom";
import * as RoutesName from "../../../../routes/routes";
import {Login} from "../../../../routes/routes";
import MarketHeader from "./components/MarketHeader/MarketHeader";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import ReactTooltip from "react-tooltip";
import SettingHeader from "./components/SettingsHeader/SettingsHeader";
import ProtectedRoute from "../../../../components/ProtectedRoute/ProtectedRoute";
import {images} from "../../../../assets/images";
import {setLogoutInitiate} from "../../../../store/actions";
import {toast} from "react-hot-toast";
import {logOut} from "../../../../pages/Login/api/auth";
import Clock from "./components/Clock/Clock";

const Header = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = async () => {
        logOut().then(()=>{
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(()=>{
            toast.error(t("header.logOutError"));
        })
    }

    return (
        <div className={`container row jc-between ai-center px-1 py-1 ${classes.container}`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <Routes>
                    <Route exact path={RoutesName.Dashboard} element={<MarketHeader/>}/>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={RoutesName.Wallet + "/:id"} element={<WalletHeader/>}/>
                        <Route path={RoutesName.Settings+"/*"} element={<SettingHeader/>}/>
                    </Route>
                    <Route path="*" element={<h4>{t("comingSoon")}</h4>}/>
                </Routes>
                <div className={`col-25 column ai-end`}>
                    {firstName === null ? (
                        <Link to={Login} className="hover-text">
                            <p>{t("pleaseLogin")}</p>
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
                    <Link to={Login} className="flex">
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