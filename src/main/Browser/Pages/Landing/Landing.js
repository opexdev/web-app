import React from 'react';
import classes from "./Landing.module.css";
import {images} from "../../../../assets/images";
import MarketTitle from "./components/MarketTitle/MarketTitle";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import Spinner from "./components/Spinner/Spinner";
import MarketView from "./components/MarketView/MarketView";
import MarketInfo from "./components/MarketInfo/MarketInfo";
import Footer from "../UserPanel/Sections/Footer/Footer";
import ScrollBar from "../../../../components/ScrollBar";

const Landing = () => {

    return (
        <div className={`${classes.container} move-image`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`row jc-between ai-center width-90 m-auto`} style={{height: "70vh"}}>
                <div className={`width-30 column jc-between ai-start`} style={{height: "55vh"}}>
                    <MarketTitle/>
                    <GeneralInfo/>
                </div>
                <div className={`width-40 height-100`}>
                    <Spinner/>
                </div>
                <div className={`width-30 flex jc-end`}>
                    <MarketView/>
                </div>
            </div>
            <div className={`flex jc-center mb-5`} style={{height: "", backgroundColor: "var(--mainContent)"}}>
                <MarketInfo/>
            </div>
        </div>
    );
}

export default Landing;