import React from "react";
import ToggleSwitch from "../../../../../../components/ToggleSwitch/ToggleSwitch";
import {setThemeInitiate} from "../../../../../../store/actions";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";


const TheSettings = (props) => {

    const {t} = useTranslation();

    return (
        <div className={`container column jc-around ai-center`} style={{height:"100%"}}>
            <span>{t("comingSoon")}</span>
            <ToggleSwitch onchange={(e) => props.onThemeChange(e.target.checked)} checked={props.isDark}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(TheSettings);
