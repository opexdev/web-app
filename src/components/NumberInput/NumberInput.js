import React from "react";
import NumberFormat from 'react-number-format';
import * as classes from "./NumberInput.module.css";
import Icon from "../Icon/Icon";


const NumberInput = (props) => {
    return (
        <div className={props.customClass ?? ""}>
            <div className={classes.inputGroup}>
                <span className={`${classes.lead} lead`}>{props.lead}</span>
                <NumberFormat
                    thousandSeparator={true}
                    allowNegative={false}
                    decimalScale={props.maxDecimal}
                    onChange={props.onchange}
                    isAllowed={props.isAllowed}
                    prefix={props.prefix}
                    value={props.value}
                    format={props.format}
                    placeholder={props.placeholder}
                    mask={props.mask}
                />
                <span className={`${classes.after} after`}>{props.after}</span>
            </div>
            {
                props.alert != null ?
                    <div className={`${classes.inputGroupHint} inputGroupHint `}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={props.hint}
                    >
                        <Icon iconName="icon-info icon-white font-size-sm flex" customClass={classes.hintIcon}/>
                        <span className="alert pr-05">{props.alert}</span>
                    </div>
                    :
                    ""
            }

        </div>
    )
}

export default NumberInput;