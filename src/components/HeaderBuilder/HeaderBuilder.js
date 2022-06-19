import React, {useEffect} from 'react';
import classes from './HeaderBuilder.module.css'
import {Link} from "react-router-dom";
import {Login , Dashboard} from "../../routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../routes/routes";
import {toast} from "react-hot-toast";
import {logOut} from "../../pages/Login/api/auth";
import {images} from "../../assets/images";
import {setLogoutInitiate} from "../../store/actions";
import Clock from "../../main/Browser/Sections/Header/components/Clock/Clock";

const HeaderBuilder = ({children}) => {

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
            toast.success(<Trans
                i18nKey="header.logOutSuccess"
            />)
        })
        dispatch(setLogoutInitiate())
    }


    return (
        <div className={`${classes.container} container row jc-between ai-center px-2`}>
            <div className={`row jc-between ai-center ${classes.content}`}>
                <div className={`flex jc-start ai-center  width-30`}>
                    <Link to={Routes.Landing}>
                        <img src={images.opexLogoPlus} alt="" className={`img-lg-plus`}/>
                    </Link>
                </div>

                <div className={`width-40 text-center`}>
                    {children}
                </div>



                <div className={`column ai-end width-25`}>
                    {firstName === null ? (
                        <Link to={Login} className="hover-text">
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
                    <Link to={Login} className="flex">
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