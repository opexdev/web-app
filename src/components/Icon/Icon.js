import React from "react";

const Icon = (props) => {
  return (
    <span className={props.customClass} onClick={props.onClick}>
      <i className={props.iconName} />
    </span>
  );
};

export default Icon;
