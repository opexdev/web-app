import React from "react";
import classes from "./SubMenu.module.css";
import Market from "../../pages/Dashboard/Market/Market";

const SubMenu = (props) => {

    return (
        <div className={classes.container} >
            <Market/>
        </div>
    )
};

export default SubMenu;