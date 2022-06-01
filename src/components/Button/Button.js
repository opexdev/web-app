import React from "react";

const Button = ({buttonTitle,buttonClass,buttonStyle,innerRef, ...rest}) => {
    return (
        <button
            style={buttonStyle}
            className={`${buttonClass} button cursor-pointer`}
            {...rest}
            ref={innerRef}
            >
            {buttonTitle}
        </button>
    );
};

export default Button;
