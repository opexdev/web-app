import React from 'react';
import classes from "./AllMarket.module.css";
import AllMarketHeader from "./Sections/AllMarketHeader/AllMarketHeader";
import AllMarketContent from "./Sections/AllMarketContent/AllMarketContent";
import {images} from "../../../../assets/images";

const AllMarket = () => {

    return (
        <div className={`container ${classes.container} move-image column text-color`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <AllMarketHeader/>
            <AllMarketContent/>

        </div>

    );
}

export default AllMarket;