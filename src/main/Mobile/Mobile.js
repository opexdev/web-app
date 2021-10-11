import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {images} from "../../assets/images";
import {loadConfig, setThemeInitiate} from "../../store/actions";


const Mobile = (props) => {
    const {t} = useTranslation();
    const [ltr, setLtr] = useState(false);

    useEffect(() => {
        props.onLoad();
        i18n.language !== "fa" ? setLtr(true) : setLtr(false);
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? setLtr(true) : setLtr(false);
        });
    }, []);


    return (
        <div className="mobile-view">
            <img className={`flashit`} src={images.opexLogo_light} alt="logo"/>
            <h1>
                {t('desktopSupport')}
            </h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.global.isLoading,
        isDark: state.global.isDark,
        isLogin: state.auth.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(loadConfig()),
        onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mobile);
