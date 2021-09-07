import React from "react";
import classes from "./ToggleSwitch.module.css"


const ToggleSwitch = (props) => {
    return (
        <label className={`${classes.switch}`}>
            <input type="checkbox" onChange={(e)=>props.onchange(e)}  checked={props.checked}/>
            <span className={`${classes.slider}`}/>
        </label>
    );
};

export default ToggleSwitch;