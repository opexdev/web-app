import React from "react";
import classes from "./Footer.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import  *  as Routes  from "../../../../routes/routes";
import {NavHashLink} from "react-router-hash-link";
import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch";
import i18n from "i18next";
import {images} from "../../../../assets/images";
import {setThemeInitiate} from "../../../../store/actions";

const Footer = (props) => {
    const {t} = useTranslation();
    return (
        <div className={`container column footerBackground font-size-sm-plus mt-1 py-2 px-4`}>
            <div className={`container row jc-between ai-center`}>
                <div className="row">
                    <div className="column px-1">
                        <NavHashLink to={Routes.Guide + "#about-us"}>
                            <span className="hover-text">{t("footer.aboutUs")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#contact-us"}>
                            <span className="hover-text">{t("footer.contactUS")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#blog"}>
                            <span className="hover-text">{t("footer.blog")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#guides"}>
                            <span className="hover-text">{t("footer.guide")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#rules"}>
                            <span className="hover-text">{t("footer.rules")}</span>
                        </NavHashLink>
                    </div>
                    <div className="column px-1">
                        <NavHashLink to={Routes.Guide + "#commission"}>
                            <span className="hover-text">{t("commission")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#api"}>
                            <span className="hover-text">{t("footer.api")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#addCoin"}>
                            <span className="hover-text">{t("footer.addCoin")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#demo"}>
                            <span className="hover-text">{t("footer.demo")}</span>
                        </NavHashLink>
                        <NavHashLink to={Routes.Guide + "#errorReport"}>
                            <span className="hover-text">{t("footer.errorReport")}</span>
                        </NavHashLink>
                    </div>

                </div>

                <div className={`column ai-center jc-center`}>
                    <div className={`row ai-center py-2`}>
                        <span className={`pl-1`}>{t("footer.changeColor")}:</span>
                        <ToggleSwitch onchange={(e) => props.onThemeChange(e.target.checked)} checked={props.isDark}/>
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
                <img className={`img-lg-plus`} src={images.opexLogoPlus} alt={t("title")}/>
            </div>
            <div className={`container flex jc-center ai-center`}>
                <p>{t("footer.copyright")}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
