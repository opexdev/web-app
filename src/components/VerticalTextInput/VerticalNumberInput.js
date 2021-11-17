import React from "react";
import NumberFormat from "react-number-format";
import * as classes from "./VerticalNumberInput.module.css";
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
            data-html={true}
            data-place="left"
            data-effect="float"
            data-tip={hint}>
            <Icon
                iconName="icon-info icon-white font-size-sm flex"
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
