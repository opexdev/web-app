import React, {useState} from 'react';
import classes from './Swing.module.css'
import {images} from "../../../../../../../../assets/images";

const Swing = () => {

    const [stop, setStop] = useState(null)

    const MouseEnterEventHandler = (index) => {
        setStop(index)
    }
    const MouseLeaveEventHandler = () => {
        setStop(null)
    }

    return (
        <div className={`row jc-center ai-start`} style={{height:"40vh"}}>
            <div className={`${classes.line} ${classes.BTC}`} style={{animationPlayState: stop === "BTC"  ? "paused" : "running"}}
                 onMouseEnter={()=>MouseEnterEventHandler("BTC")} onMouseLeave={MouseLeaveEventHandler}>
                <div className={`${classes.lineG}`}/>
                <img src={images.BTC} alt="BTC" className={`cursor-grabbing`}/>
            </div>
            <div className={`${classes.line} ${classes.ETH}`} style={{animationPlayState: stop === "ETH"  ? "paused" : "running"}}
                 onMouseEnter={()=>MouseEnterEventHandler("ETH")} onMouseLeave={MouseLeaveEventHandler}>
                <div className={`${classes.lineG}`}/>
                <img src={images.ETH} alt="ETH" className={`cursor-grabbing`}/>
            </div>
            <div className={`${classes.line} ${classes.USDT}`} style={{animationPlayState: stop === "USDT"  ? "paused" : "running"}}
                 onMouseEnter={()=>MouseEnterEventHandler("USDT")} onMouseLeave={MouseLeaveEventHandler}>
                <div className={`${classes.lineG}`}/>
                <img src={images.USDT} alt="USDT" className={`cursor-grabbing`}/>
            </div>
        </div>
    );
};

export default Swing;