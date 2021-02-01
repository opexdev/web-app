import React, {Fragment} from "react";
import "./TextInput.css";
import Icon from "../Icon/Icon";


const TextInput = (props) => {
    return (
        <div>
            <div className={`input-group ${props.customClass}`}>
                <span className="lead">{props.lead}</span>
                <input value={props.value} type={props.type} onChange={props.onchange} />
            </div>
            {
                props.alert != null ?
                    <div className={`input-group-hint ${props.customClass}`}
                         data-html={true}
                         data-place="left"
                         data-effect="float"
                         data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">info</span>
                                                    <span >info</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">info</span>
                                                    <span >info</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">info</span>
                                                    <span >info</span>
                                                </div>
                                            </div>
                                        `}

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