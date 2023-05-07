import React from "react";
import NumberFormat from "react-number-format";
import classes from "./NumberInput.module.css";
import Icon from "../Icon/Icon";

const NumberInput = (props) => {

    const {maxDecimal, onchange, lead , after ,hint , alert , alerts, customClass, ...other} = props

    const selectInput = (event) => {
        if (event.target.value === "0") {
            event.target.select();
        }
    }

    let leadSection = null
    let afterSection = null
    let alertSection = null

    let inputSection = <NumberFormat
        thousandSeparator={true}
        allowNegative={false}
        decimalScale={maxDecimal}
        onChange={onchange}
        {...other}
        onFocus={selectInput}
        onClick={selectInput}
    />

    if(lead){
        leadSection = <span className={`${classes.lead} lead`}>{lead}</span>
    }

    if(after){
        afterSection = <span className={`after ${classes.after}`}>{after}</span>
    }

    if (alert){
        alertSection =<div
            className={`${classes.inputGroupHint} inputGroupHint fs-0-7`}
            data-tooltip-id="opex-tooltip"
            data-tooltip-place="left"
            data-tooltip-float={true}
            data-tooltip-html={hint}>
            <Icon
                iconName="icon-info text-white fs-0-7 flex"
                customClass={classes.hintIcon}
            />
            <span className="alert pr-05">{alert}</span>
        </div>
    }

    if (alerts){
        alertSection =<div
            className={`${classes.inputGroupHint} inputGroupHint jc-start`}
            data-tooltip-id="opex-tooltip"
            data-tooltip-place="left"
            data-tooltip-float={true}
            data-tooltip-html={props.hint}>
            <Icon
                iconName={`${classes.iconInfo} text-white fs-0-7 flex`}
                customClass="hint-icon"
            />
            <div className="column pt-05">
                { alerts.map((alert , index) => <span key={index} className={`${classes.alert} pr-05 `}>{alert}</span>) }
            </div>
        </div>
    }



    return (
        <div className={customClass ?? ""}>
            <div className={classes.inputGroup}>
                {leadSection}
                {inputSection}
                {afterSection}
            </div>
            {alertSection}
        </div>
    );
};

export default NumberInput;
