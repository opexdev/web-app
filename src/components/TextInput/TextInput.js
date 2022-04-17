import React from "react";
import Icon from "../Icon/Icon";
import Select from "react-select";
import * as classes from "./TextInput.module.css";

const TextInput = (props) => {
    const {customRef,readOnly,onchange,customClass,options, lead , after ,select ,alerts ,max , ...other} = props

    let leadSection = null
    let afterSection = null
    let alertSection = null

    let inputSection = <input
        ref={customRef}
        readOnly={readOnly}
        onChange={onchange}
        max={max}
        {...other}
    />

    if(lead){
        leadSection = <span className={`lead ${classes.lead}`}>{lead}</span>
    }

    if ( select ){
        inputSection = <Select
            onChange={onchange}
            options={options}
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


export default TextInput;
