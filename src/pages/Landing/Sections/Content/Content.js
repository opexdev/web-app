import React from 'react';
import classes from './Content.module.css'
import ScrollBar from "../../../../components/ScrollBar";
import Footer from "../../../../main/Browser/Sections/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import MarketSliders from "./components/MarketSliders/MarketSliders";
import MarketInfo from "./components/MarketInfo/MarketInfo";
import MarketView from "./components/MarketView/MarketView";
import MarketTitle from "./components/MarketTitle/MarketTitle";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import PopularCryptocurrencies from "./components/PopularCryptocurrencies/PopularCryptocurrencies";

const Content = () => {
    return (
        <div className={`${classes.container} container column`}>
            <ScrollBar>

                <div className={`row jc-between ai-center px-2`} style={{height:"65vh"}}>
                    <div className={`width-30 column jc-between ai-end`} style={{height:"47vh"}}>
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


                <div className={`card-background flex jc-center`} style={{height:"50vh"}}>
                    <PopularCryptocurrencies/>
                </div>


               {/* <div className={`width-90 m-auto overflowX-hidden`} style={{height:"25vh"}}>

                    <MarketSliders/>

                </div>

                <div className={`my-4 width-90 m-auto`}>

                    <MarketInfo/>

                </div>*/}








                <Footer/>


            </ScrollBar>

        </div>
    );
};

export default Content;