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
import {setUserConfig} from "js-api-client";

const Footer = () => {
    const {t} = useTranslation();
    const theme = useSelector((state) => state.global.theme)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const dispatch = useDispatch()
    const languages = useSelector((state) => state.exchange.supportedLanguages)
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        if (isLogin) {
            setUserConfig({
                language: lang
            })
        }
    }

    return (
        <div className={`width-100 column jc-center ai-center ${classes.container} fs-0-8 mt-1 py-2`}>
            <div className={`width-90 row jc-between ai-center`}>
                <div className="row">
                    <div className="column">
                        <Link to={Routes.Landing}>
                            <span className="hover-text">{t("home")}</span>
                        </Link>
                        <Link to={Routes.Panel}>
                            <span className="hover-text">{t("MarketTitle.advancedTrading")}</span>
                        </Link>
                        <Link to={Routes.AllMarket}>
                            <span className="hover-text">{t("market.title")}</span>
                        </Link>

                        <Link to={Routes.Commission}>
                            <span className="hover-text">{t("commissions.title")}</span>
                        </Link>
                        <Link to={Routes.TransferFees}>
                            <span className="hover-text">{t("transferFees.title")}</span>
                        </Link>
                    </div>
                    <div className="column px-2">
                        <Link to={Routes.AboutUs}>
                            <span className="hover-text">{t("aboutUs.title")}</span>
                        </Link>
                        <Link to={Routes.ContactUs}>
                            <span className="hover-text">{t("contactUs.title")}</span>
                        </Link>
                        <Link to={Routes.Guide}>
                            <span className="hover-text">{t("guide.title")}</span>
                        </Link>
                        <Link to={Routes.Rules}>
                            <span className="hover-text">{t("rules.title")}</span>

                        </Link>
                    </div>
                </div>
                <div className={`column ai-center jc-center`}>
                    <div className={`row ai-center py-2`}>
                        <span className={`pl-1`}>{t("Footer.darkMode")}:</span>
                        <ToggleSwitch
                            onchange={(e) => dispatch(setThemeInitiate(e.target.checked ? "DARK" : "LIGHT", isLogin))}
                            checked={theme === "DARK"}/>
                    </div>
                    <div className={`row ai-center jc-between`}>
                        <div className={`row ai-center ${classes.languages}`}>
                            {languages?.map((lang, index) => <span className="cursor-pointer px-1"
                                                                   onClick={() => changeLanguage(lang)}
                                                                   key={index}>{t("Languages." + lang)}</span>)}
                        </div>
                    </div>
                </div>
                <div className={`column jc-center ai-center`}>
                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")}
                         className={`img-lg-plus mb-1`}/>
                    <span className={`mt-1`}>{packageJson.version}</span>
                </div>
            </div>
            <div className={`width-90 flex jc-center ai-center mt-1`}>
                <p>
                    <Trans
                        i18nKey="Footer.copyright"
                        values={{
                            year: new Intl.DateTimeFormat(i18n.language, {year: 'numeric'}).format(new Date()),
                        }}
                    />
                </p>
            </div>
        </div>
    );
};

export default Footer;