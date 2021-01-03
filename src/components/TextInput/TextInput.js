import React from "react";
import "./TextInput.css";

const TextInput = (props) => {
    return (
        <div className={`input-group ${props.customClass}`}>
            <span className="lead">{props.lead}</span>
            <input type="number" value={props.value} onChange={props.onchange}/>
            <span className="after">{props.after}</span>
        </div>
    )

}

export default TextInput;