import React from "react";
import classes from "./Footer.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import *  as Routes from "../../../../Routes/routes";
import ToggleSwitch from "../../../../../../components/ToggleSwitch/ToggleSwitch";
import i18n from "i18next";
import {setThemeInitiate} from "../../../../../../store/actions";
import {Link} from "react-router-dom";
import packageJson from "../../../../../../../package.json"
import {toAbsoluteUrl} from "../../../../../../utils/utils";

const Footer = () => {
    const {t} = useTranslation();
    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch()

    return (
        <div className={`width-100 column ${classes.container} fs-0-8 mt-1 py-2 px-4`}>
            <div className={`width-100 row jc-between ai-center`}>
                <div className="row">
                    <div className="column px-1">
                        <Link to={Routes.Guide + "#about-us"}>
                            <span className="hover-text">{t("Footer.aboutUs")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#contact-us"}>
                            <span className="hover-text">{t("Footer.contactUS")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#blog"}>
                            <span className="hover-text">{t("Footer.blog")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#guides"}>
                            <span className="hover-text">{t("Footer.guide")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#rules"}>
                            <span className="hover-text">{t("Footer.rules")}</span>
                        </Link>
                    </div>
                    <div className="column px-1">
                        <Link to={Routes.Guide + "#commission"}>
                            <span className="hover-text">{t("commission")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#api"}>
                            <span className="hover-text">{t("Footer.api")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#addCoin"}>
                            <span className="hover-text">{t("Footer.addCoin")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#demo"}>
                            <span className="hover-text">{t("Footer.demo")}</span>
                        </Link>
                        <Link to={Routes.Guide + "#errorReport"}>
                            <span className="hover-text">{t("Footer.errorReport")}</span>
                        </Link>
                    </div>

                </div>
                <div className={`column ai-center jc-center`}>
                    <div className={`row ai-center py-2`}>
                        <span className={`pl-1`}>{t("Footer.darkMode")}:</span>
                        <ToggleSwitch onchange={(e) => dispatch(setThemeInitiate(e.target.checked))} checked={isDark}/>
                    </div>
                    <div className={`row ai-center jc-between`}>
                        <div className={`row ai-center ${classes.languages}`}>
                            {
                                window.env.REACT_APP_MULTI_LANGS_SUPPORT === 'TRUE' && <>
                                <span className="cursor-pointer pl-1"
                                      onClick={() => i18n.changeLanguage("fa")}>{t("Languages.Persian")}</span>
                                    <span className="cursor-pointer pr-1"
                                          onClick={() => i18n.changeLanguage("en")}>{t("Languages.English")}</span>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={`column jc-center ai-center`}>
                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")}
                         className={`img-lg-plus mb-1`}/>
                    <span className={`mt-1`}>{packageJson.version}</span>
                </div>
            </div>
            <div className={`width-100 flex jc-center ai-center mt-1`}>
                <p>
                    <Trans
                        i18nKey="Footer.copyright"
                        values={{
                            year: new Intl.DateTimeFormat(i18n.language , {year: 'numeric'}).format(new Date()),
                        }}
                    />
                </p>
            </div>
        </div>
    );
};

export default Footer;