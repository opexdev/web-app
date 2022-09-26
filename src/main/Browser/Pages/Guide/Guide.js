import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import classes from "./Guide.module.css";
import i18n from "i18next";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {useTranslation} from "react-i18next";
import Button from "../../../../components/Button/Button";
import {images} from "../../../../assets/images";
import ScrollBar from "../../../../components/ScrollBar";
import * as Routes from "../../Routes/routes";
import HashContent from "./components/HashContent/HashContent";

const Guide = () => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);
    const navigate = useNavigate();
    const location = useLocation ();
    const isDark = useSelector((state) => state.global.isDark)

    useEffect(() => {
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    return (
        <div className={`width-100 row ${classes.container} ${isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"}`}>
            <div className={`${classes.menu}`}>
                <div className={`${classes.top} column jc-around ai-center py-2`}>
                    <img src={images.opexLogoPlus} alt=""/>
                    <Button
                        buttonClass={classes.thisButton}
                        type="button"
                        onClick={() => navigate("/", { replace: true })}
                        buttonTitle="بازگشت"
                    />
                </div>

                <div className={`${classes.body} column jc-around ai-center py-3`}>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#about-us" }}
                        className={() =>
                            location.hash === "#about-us" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.aboutUs")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#contact-us" }}
                        className={() =>
                            location.hash === "#contact-us" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.contactUS")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#blog" }}
                        className={() =>
                            location.hash === "#blog" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.blog")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#guides" }}
                        className={() =>
                            location.hash === "#guides" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.guide")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#rules" }}
                        className={() =>
                            location.hash === "#rules" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.rules")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#commission" }}
                        className={() =>
                            location.hash === "#commission" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("commission")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#api" }}
                        className={() =>
                            location.hash === "#api" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.api")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#addCoin" }}
                        className={() =>
                            location.hash === "#addCoin" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.addCoin")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#demo" }}
                        className={() =>
                            location.hash === "#demo" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.demo")}</span>
                    </NavLink>
                    <NavLink
                        to={{ pathname: Routes.Guide, hash: "#errorReport" }}
                        className={() =>
                            location.hash === "#errorReport" ? `${classes.navMenu} ${classes.selected}` : classes.navMenu
                        }>
                        <span>{t("footer.errorReport")}</span>
                    </NavLink>
                </div>
            </div>

            <div className={`${classes.content} column jc-center ai-center`}>
                <ScrollBar>
                    <HashContent
                    id="about-us"
                    title={t("footer.aboutUs")}
                    text={t("footer.aboutUs")+"..."}
                    />
                    <HashContent
                    id="contact-us"
                    title={t("footer.contactUS")}
                    text={t("footer.contactUS")+"..."}
                    />
                    <HashContent
                    id="blog"
                    title={t("footer.blog")}
                    text={t("footer.blog")+"..."}
                    />
                    <HashContent
                    id="guides"
                    title={t("footer.guide")}
                    text={t("footer.guide")+"..."}
                    />
                    <HashContent
                    id="rules"
                    title={t("footer.rules")}
                    text={t("footer.rules")+"..."}
                    />
                    <HashContent
                    id="commission"
                    title={t("commission")}
                    text={t("commission")+"..."}
                    />
                    <HashContent
                    id="api"
                    title={t("footer.api")}
                    text={t("footer.api")+"..."}
                    />
                    <HashContent
                    id="addCoin"
                    title={t("footer.addCoin")}
                    text={t("footer.addCoin")+"..."}
                    />
                    <HashContent
                    id="demo"
                    title={t("footer.demo")}
                    text={t("footer.demo")+"..."}
                    />
                    <HashContent
                    id="errorReport"
                    title={t("footer.errorReport")}
                    text={t("footer.errorReport")+"..."}
                    />
                </ScrollBar>
            </div>
        </div>
    );
};


export default Guide;


