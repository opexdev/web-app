import React, {useEffect} from 'react';
import classes from './Header.module.css'
import {images} from "../../../../assets/images";
import Clock from "../../../../main/Browser/Sections/Header/components/Clock/Clock";
import {Link} from "react-router-dom";
import {Login , Dashboard} from "../../../../routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import {logOut} from "../../../Login/api/auth";
import {toast} from "react-hot-toast";
import {setLogoutInitiate} from "../../../../store/actions";

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

                    <img src={images.opexLogoPlus} alt="" className={`img-lg-plus`}/>
                </div>

                <h2 className={`width-40 text-center`}>پلتفرم تبادل ارزهای دیجیتال</h2>

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

export default Header;