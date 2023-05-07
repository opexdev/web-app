import React from "react";
import Icon from "../Icon/Icon";
import Select from "react-select";
import classes from "./TextInput.module.css";

const TextInput = (props) => {
    const {
        customRef,
        readOnly,
        onchange,
        customClass,
        options,
        lead,
        after,
        select,
        alerts,
        max,
        ltr,
        info,
        ...other
    } = props

    let leadSection = null
    let afterSection = null
    let alertSection = null

    let inputSection = <input
        ref={customRef}
        readOnly={readOnly}
        onChange={onchange}
        max={max}
        style={{direction: ltr && 'ltr'}}
        {...other}
    />

    if(lead){
        leadSection = <span className={`lead ${classes.lead}`}>{lead}</span>
    }

    if ( select ){
        inputSection = <Select
            onChange={onchange}
            options={options}
            ref={customRef}
            classNamePrefix="select"
            className={classes.selectBox}
            {...other}
        />
    }
    if(after){
        afterSection = <span className={`after ${classes.after}`}>{after}</span>
    }

    if (alerts){
        alertSection =<div
            className={`${classes.inputGroupHint} inputGroupHint `}
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


export default TextInput;
