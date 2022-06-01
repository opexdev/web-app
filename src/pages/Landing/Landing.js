import React from 'react';
import classes from "./Landing.module.css";

const Landing = (props) => {

    return (
        <div className={`container ${classes.container} flex jc-center ai-center text-color`}>
            <span className={`font-size-lg-plus`}>landing page</span>


        </div>
    );
}

export default Landing;