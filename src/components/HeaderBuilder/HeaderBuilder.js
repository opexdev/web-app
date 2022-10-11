import React, {useEffect} from 'react';
import classes from './HeaderBuilder.module.css'
import {Link, useLocation} from "react-router-dom";
import * as Routes from "../../main/Browser/Routes/routes";
import {Login} from "../../main/Browser/Routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
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

    useEffect(() => {
        ReactTooltip.rebuild();
    });

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
                <div className={`flex jc-start ai-center  width-30`}>
                    <Link to={Routes.Landing} className={`flex jc-start ai-center`}>
                        <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus`}/>
                    </Link>
                </div>
                <div className={`width-40 text-center`}>
                    {children}
                </div>
                <div className={`column ai-end width-25`}>
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
                        data-html={true}
                        data-place="right"
                        data-effect="float"
                        data-tip={`<span class="column jc-between col-100">${t("signOut")}</span>`}
                    />
                ) : (
                    <Link to={Login} state={{from: location}} className="flex">
                        <img
                            className="img-md-plus cursor-pointer"
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

export default HeaderBuilder;