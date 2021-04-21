import React from "react";

const Button = (props) => {
    return (
        <button
            className={`${props.buttonClass} button cursor-pointer`}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
            >
            {props.buttonTitle}
        </button>
    );
};

export default Button;
