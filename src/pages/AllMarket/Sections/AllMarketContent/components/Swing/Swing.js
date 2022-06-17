import React from 'react';
import classes from './Swing.module.css'
import {images} from "../../../../../../assets/images";

const Swing = () => {
    return (
        <div className={`row jc-center ai-start`} style={{height:"40vh"}}>
            <div className={`${classes.line} ${classes.BTC}`}>
                <div className={`${classes.lineG}`}/>
                <img src={images.BTC} alt="" className={``}/>
            </div>
            <div className={`${classes.line} ${classes.ETH}`}>
                <div className={`${classes.lineG}`}/>
                <img src={images.ETH} alt="" className={``}/>
            </div>
            <div className={`${classes.line} ${classes.USDT}`}>
                <div className={`${classes.lineG}`}/>
                <img src={images.USDT} alt="" className={``}/>
            </div>

            <img src={images.astronautAloneSwing} alt="" className={`${classes.astronaut} img-lg-plus`}/>
        </div>
    );
};

export default Swing;