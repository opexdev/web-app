import React from 'react';
import classes from "./AllMarket.module.css";
import AllMarketHeader from "./Sections/AllMarketHeader/AllMarketHeader";
import AllMarketContent from "./Sections/AllMarketContent/AllMarketContent";

const AllMarket = (props) => {

    return (
        <div className={`container ${classes.container} move-image column text-color`}>
            <AllMarketHeader/>
            <AllMarketContent/>

        </div>

    );
}

export default AllMarket;