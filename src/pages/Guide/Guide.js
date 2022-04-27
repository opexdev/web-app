import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import classes from "./Guide.module.css";
import i18n from "i18next";
import {NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";

import {useTranslation} from "react-i18next";
import Button from "../../components/Button/Button";
import {images} from "../../assets/images";
import ScrollBar from "../../components/ScrollBar";
import * as Routes from "../../routes/routes";
import {NavHashLink} from "react-router-hash-link";
import HashContent from "./components/HashContent/HashContent";

const Guide = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);
    const history = useHistory();
    const [section, setSection] = useState(null)


    useEffect(() => {
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);

    const data = [
        {
            id: 1,
            title: t('signIn'),
            body: ""
        },
        {id: 2, title: t('signUp'), body: ""},
    ];

    return (
        <div className={`container row ${classes.container} ${props.isDark ? "dark" : ""} ${ltr ? "ltr" : "rtl"}`}>
            <div className={`${classes.menu}`}>

                <div className={`${classes.top} column jc-around ai-center py-2`}>
                    <img src={images.opexLogoPlus} alt=""/>
                    <Button
                        buttonClass={classes.thisButton}
                        type="button"
                        onClick={() => history.push("/")}
                        buttonTitle="بازگشت"
                    />
                </div>

                <div className={`${classes.body} column jc-around ai-center py-3`}>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#about-us"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.aboutUs")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#contact-us"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.contactUS")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#blog"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.blog")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#guides"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.guide")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#rules"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.rules")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#commission"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("commission")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#api"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.api")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#addCoin"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.addCoin")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#demo"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.demo")}</span>
                    </NavHashLink>
                    <NavHashLink
                        exact={true}
                        to={Routes.Guide + "#errorReport"}
                        className={`${classes.navMenu}`}
                        activeClassName={classes.selected}>
                        <span>{t("footer.errorReport")}</span>
                    </NavHashLink>
                </div>
            </div>

            <div className={`${classes.content} column jc-center ai-center`}>

                <ScrollBar>
                    <HashContent
                    id="about-us"
                    title={t("footer.aboutUs")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="contact-us"
                    title={t("footer.contactUS")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="blog"
                    title={t("footer.blog")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="guides"
                    title={t("footer.guide")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="rules"
                    title={t("footer.rules")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="commission"
                    title={t("commission")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="api"
                    title={t("footer.api")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="addCoin"
                    title={t("footer.addCoin")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="demo"
                    title={t("footer.demo")}
                    text="توضیحات..."
                    />
                    <HashContent
                    id="errorReport"
                    title={t("footer.errorReport")}
                    text="توضیحات..."
                    />

                    {/*<p style={{height: "100vh"}}
                       id="about-us">
                    </p>
                    <p style={{height: "100vh"}}
                       id="contact-us">
                    </p>*/}
                </ScrollBar>
            </div>


        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        isDark: state.global.isDark,
    };
};

export default connect(mapStateToProps, null)(Guide);


