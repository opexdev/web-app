import React from 'react';
import classes from './Spinner.module.css'
import {images} from "../../../../../../assets/images";

const Spinner = () => {
    return (
        <div className={`${classes.container} flex jc-center ai-center`}>

            <div className={`${classes.circle1} ${classes.spin}`}>
                <img src={images.BTC} alt="" className={`${classes.BTC} ${classes.spin}`}/>
            </div>
            <div className={`${classes.circle2} ${classes.spin}`}>
                <img src={images.ETH} alt="" className={`${classes.ETH} ${classes.spin}`}/>
            </div>
            <div className={`${classes.circle3} ${classes.spin}`}>
                <img src={images.USDT} alt="" className={`${classes.USDT} ${classes.spin}`}/>
            </div>

            <img src={images.astronautAlone} alt="" className={`${classes.astronaut} floating`}/>
        </div>
    );
};

export default Spinner;