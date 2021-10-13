import React from "react";
import classes from "./TheHeader.module.css";
import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch";
import {setThemeInitiate} from "../../../../store/actions";
import {connect} from "react-redux";


const TheHeader = (props) => {

    return (
        <div className={`container row ai-center jc-around ${classes.container}`}>

            <h4>بیتکوین/تومان</h4>

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

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader);