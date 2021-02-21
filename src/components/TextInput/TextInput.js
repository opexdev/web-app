import React from "react";
import "./TextInput.css";
import Icon from "../Icon/Icon";
import Select from "react-select";


const TextInput = (props) => {

    return (
        <div>
            <div className={`input-group ${props.customClass ?? ""}`}>
                <span className="lead">{props.lead}</span>
                { props.select ?
                    <Select onChange={props.onchange} options={props.options} placeholder={props.placeholder} classNamePrefix="select" className={"select-box"}/>
                    :
                    <input value={props.value} type={props.type} onChange={props.onchange} placeholder={props.placeholder}/>
                }
            </div>
            {
                props.alert != null ?
                    <div className={`input-group-hint ${props.customClass}`}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={props.hint}

                    >
                        <Icon iconName="icon-info icon-white font-size-sm" customClass="hint-icon"/>
                        <span className="alert pr-05">{props.alert}</span>
                    </div>
                    :
                    ""
            }

        </div>
    )
}

export default TextInput;