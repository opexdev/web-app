import React from "react";

const Button = ({buttonTitle,buttonClass,innerRef, ...rest}) => {
    return (
        <button
            className={`${buttonClass} button cursor-pointer`}
            {...rest}
            ref={innerRef}
            >
            {buttonTitle}
        </button>
    );
};

export default Button;
