import React from 'react';
import classes from './EasyTrading.module.css'
import {images} from "../../../../assets/images";
import PriceInfo from "../AllMarket/components/PriceInfo/PriceInfo";
import Swing from "../AllMarket/components/Swing/Swing";
import VolumeInfo from "../AllMarket/components/VolumeInfo/VolumeInfo";
import AllMarketInfo from "../AllMarket/components/AllMarketInfo/AllMarketInfo";
import EasyOrder from "./components/EasyOrder/EasyOrder";

const EasyTrading = () => {
    return (
        <EasyOrder/>
    );
};

export default EasyTrading;
