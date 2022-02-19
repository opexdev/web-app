import React from "react";
import NumberFormat from "react-number-format";
import * as classes from "./NumberInput.module.css";
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
            className={`${classes.inputGroupHint} inputGroupHint font-size-sm`}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={hint}>
            <Icon
                iconName="icon-info icon-white font-size-sm flex"
                customClass={classes.hintIcon}
            />
            <span className="alert pr-05">{alert}</span>
        </div>
    }

    if (alerts){
        alertSection =<div
            className={`${classes.inputGroupHint} inputGroupHint jc-start`}
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={props.hint}>
            <Icon
                iconName={`${classes.iconInfo} icon-white font-size-sm flex`}
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
