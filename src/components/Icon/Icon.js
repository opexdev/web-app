import React from "react";

const Icon = (props) => {

    return (
        <span className={props.customClass}>
            <i className={props.iconName}/>
        </span>
    )
};

export default Icon;