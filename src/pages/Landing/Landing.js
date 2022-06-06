import React from 'react';
import classes from "./Landing.module.css";
import {images} from "../../assets/images";
import Header from "./Sections/Header/Header";
import Content from "./Sections/Content/Content";

const Landing = (props) => {

    return (
        /*<div className={`container ${classes.container} move-image flex jc-center ai-center text-color`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            {/!*<span className={`font-size-lg-plus`}>landing page</span>*!/}


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


        </div>*/
        <div className={`container ${classes.container} move-image column text-color`} style={{backgroundImage: `url("${images.spaceStar}")`}}>



            <Header/>
            <Content/>


        </div>

    );
}

export default Landing;