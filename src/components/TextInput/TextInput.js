import React from "react";
import Icon from "../Icon/Icon";
import Select from "react-select";
import * as classes from "./TextInput.module.css"

const TextInput = (props) => {
    return (
        <div className={props.customClass ?? ""}>
            <div className={classes.inputGroup}>
                <span className={`${classes.lead} lead`}>{props.lead}</span>
                { props.select ?
                    <Select onChange={props.onchange} options={props.options} placeholder={props.placeholder} classNamePrefix="select" className={classes.selectBox}/>
                    :
                    <input value={props.value} type={props.type} onChange={props.onchange} placeholder={props.placeholder}/>
                }
            </div>
            {
                props.alert != null ?
                    <div className={`${classes.inputGroupHint} inputGroupHint `}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={props.hint}
                    >
                        <Icon iconName={`${classes.iconInfo} icon-white font-size-sm`} customClass="hint-icon"/>
                        <span className={`${classes.alert} pr-05 `}>{props.alert}</span>
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default TextInput;