import React from 'react';
import classes from "./AllMarket.module.css";
import {images} from "../../../../assets/images";
import PriceInfo from "./components/PriceInfo/PriceInfo";
import Swing from "./components/Swing/Swing";
import VolumeInfo from "./components/VolumeInfo/VolumeInfo";
import AllMarketInfo from "./components/AllMarketInfo/AllMarketInfo";

const AllMarket = () => {

    return (
        <div className={`${classes.container} move-image`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`row jc-between ai-center width-90 m-auto`} style={{height: "40vh"}}>
                <div className={`width-35 flex `}>
                    <PriceInfo/>
                </div>
                <div className={`width-25 flex jc-center ai-start`}>
                    <Swing/>
                </div>
                <div className={`width-35 flex`}>
                    <VolumeInfo/>
                </div>
            </div>
            <div className={`flex jc-center`} style={{height: "", backgroundColor: "var(--mainContent)"}}>
                <AllMarketInfo/>
            </div>
        </div>
    );
}

export default AllMarket;