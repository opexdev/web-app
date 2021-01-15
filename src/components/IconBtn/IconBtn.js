import React from "react";
import classes from "./IconBtn.module.css";



const IconBtn = (props) => {

    return (
        <i className={`flex jc-center ai-center ${props.iconBG}`} id="container">
            <i className={`${props.iconClass} flex`}/>
        </i>
    )
};

export default IconBtn;