import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import classes from "./Guide.module.css";
import i18n from "i18next";
import {useHistory} from "react-router-dom";

import {useTranslation} from "react-i18next";
import Button from "../../components/Button/Button";
import {images} from "../../assets/images";

const Guide = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);
    const history = useHistory();


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

                <div className={`${classes.top} column jc-around ai-center`}>
                    <img src={images.opexLogo_light} alt=""/>

                    <Button
                        buttonClass={classes.thisButton}
                        type="button"
                        onClick={()=>history.push("/")}
                        buttonTitle="بازگشت"
                    />
                </div>

                <div className={`${classes.body} flex jc-center ai-center`}>
                    <span>{t("comingSoon")}</span>
                </div>
            </div>

            <div className={`${classes.content} flex jc-center ai-center`}>
                <span className={`font-size-md-plus`}>{t("comingSoon")}</span>
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


