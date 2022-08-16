import React from "react";
import classes from "./Footer.module.css";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import *  as Routes from "../../../../Routes/routes";
import ToggleSwitch from "../../../../../../components/ToggleSwitch/ToggleSwitch";
import i18n from "i18next";
import {images} from "../../../../../../assets/images";
import {setThemeInitiate} from "../../../../../../store/actions";
import {Link} from "react-router-dom";
import packageJson from "../../../../../../../package.json"

const Footer = () => {
    const {t} = useTranslation();
    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch()

    return (
        <div className={`container column footerBackground font-size-sm-plus mt-1 py-2 px-4`}>
            <div className={`container row jc-between ai-center`}>
                <div className="row">
                    <div className="column px-1">
                        <Link to={Routes.Guide + "#about-us"}>
                            <span className="hover-text">{t("footer.aboutUs")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#contact-us"}>
                            <span className="hover-text">{t("footer.contactUS")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#blog"}>
                            <span className="hover-text">{t("footer.blog")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#guides"}>
                            <span className="hover-text">{t("footer.guide")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#rules"}>
                            <span className="hover-text">{t("footer.rules")}</span>
                        </Link>
                    </div>
                    <div className="column px-1">
                        <Link to={Routes.Guide + "#commission"}>
                            <span className="hover-text">{t("commission")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#api"}>
                            <span className="hover-text">{t("footer.api")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#addCoin"}>
                            <span className="hover-text">{t("footer.addCoin")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#demo"}>
                            <span className="hover-text">{t("footer.demo")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#errorReport"}>
                            <span className="hover-text">{t("footer.errorReport")}</span>
                        </Link>
                    </div>

                </div>

                <div className={`column ai-center jc-center`}>
                    <div className={`row ai-center py-2`}>
                        <span className={`pl-1`}>{t("footer.darkMode")}:</span>
                        <ToggleSwitch onchange={(e) => dispatch(setThemeInitiate(e.target.checked))} checked={isDark}/>
                    </div>
                    <div className={`row ai-center jc-between`}>
                        <div className={`row ai-center ${classes.languages}`}>
                            <span className="cursor-pointer pl-1"
                                  onClick={() => i18n.changeLanguage("fa")}>{t("Languages.Persian")}</span>
                            <span className="cursor-pointer pr-1"
                                  onClick={() => i18n.changeLanguage("en")}>{t("Languages.English")}</span>
                        </div>
                    </div>
                </div>
                <div className={`column jc-center ai-center`}>
                    <img className={`img-lg-plus mb-1`} src={images.opexLogoPlus} alt={t("title")}/>
                    <span className={`mt-1`}>{packageJson.version}</span>
                </div>
            </div>
            <div className={`container flex jc-center ai-center`}>
                <p>{t("footer.copyright")}</p>
            </div>
        </div>
    );
};

export default Footer;