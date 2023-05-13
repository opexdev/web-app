import React from "react";
import NumberFormat from "react-number-format";
import classes from "./VerticalNumberInput.module.css";
import Icon from "../Icon/Icon";

const VerticalNumberInput = (props) => {

    const {maxDecimal, onchange, lead , after ,hint , alert, customClass, top, ...other} = props

    const selectInput = (event) => {
        if (event.target.value === "0") {
            event.target.select();
        }
    }

    let leadSection = null
    let topSection = null
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

    if(top){
        topSection = <div className={`${classes.top} top`}>{top}</div>
    }

    if (alert){
        alertSection =<div
            className={`${classes.inputGroupHint} inputGroupHint `}
            data-tooltip-id="opex-tooltip"
            data-tooltip-place="left"
            data-tooltip-float={true}
            data-tooltip-html={hint}>
            <Icon
                iconName="icon-info text-white fs-0-7 flex"
                customClass={classes.hintIcon}
            />
            <span className="alert pr-05">{


            }</span>
        </div>
    }

    return (
        <div className={customClass ?? ""}>

            <div className={classes.inputGroup}>
                    {topSection}
                <div className={classes.inputGroupBody}>
                    {leadSection}
                    {inputSection}
                </div>
            </div>
            {alertSection}
        </div>
    );
};

export default VerticalNumberInput;
