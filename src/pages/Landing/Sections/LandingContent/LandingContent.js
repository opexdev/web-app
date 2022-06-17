import React from 'react';
import classes from './LandingContent.module.css'
import ScrollBar from "../../../../components/ScrollBar";
import Footer from "../../../../main/Browser/Sections/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import MarketView from "./components/MarketView/MarketView";
import MarketTitle from "./components/MarketTitle/MarketTitle";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import PopularCryptocurrencies from "./components/PopularCryptocurrencies/PopularCryptocurrencies";
import {images} from "../../../../assets/images";
import {useSelector} from "react-redux";

const LandingContent = () => {

    const isDark = useSelector((state) => state.global.isDark)

    return (
        <div className={`${classes.container} container column`}>
            <ScrollBar>
                <div className={`row jc-between ai-center px-2`} style={{height:"70vh"}}>
                    <div className={`width-30 column jc-between ai-end`} style={{height:"55vh"}}>
                        <MarketTitle/>
                        <GeneralInfo/>
                    </div>
                    <div className={`width-30`}>
                        <Spinner/>
                    </div>
                    <div className={`width-30 flex jc-start`}>
                        <MarketView/>
                    </div>
                </div>
                <div className={`flex jc-center`} style={{height:"" , backgroundColor: "var(--mainContent)"}}>
                    <PopularCryptocurrencies/>
                </div>
                <div className={`flex jc-center`} style={{height:"70vh" , backgroundColor: ""}}>
                    <img src={isDark ? images.OpexPanelMockupDark : images.OpexPanelMockupLight} alt="OpexMockup" loading="lazy"/>
                </div>
                <Footer/>
            </ScrollBar>
        </div>
    );
};

export default LandingContent;