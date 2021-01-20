import React, {Fragment} from "react";
import NumberFormat from 'react-number-format';
import "./TextInput.css";
import Icon from "../Icon/Icon";


const NumberInput = (props) => {
    return (
        <Fragment>
            <div className={`input-group ${props.customClass}`}>
                <span className="lead">{props.lead}</span>
                <NumberFormat
                    value={props.value}
                    thousandSeparator={true}
                    allowNegative={false}
                    decimalScale={props.maxDecimal}
                    onChange={props.onchange}
                />
                <span className="after">{props.after}</span>
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

        </Fragment>
    )
}

export default NumberInput;