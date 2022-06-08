import React from 'react';
import classes from './Content.module.css'
import ScrollBar from "../../../../components/ScrollBar";
import Footer from "../../../../main/Browser/Sections/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import MarketSliders from "./components/MarketSliders/MarketSliders";
import MarketInfo from "./components/MarketInfo/MarketInfo";

const Content = () => {
    return (
        <div className={`${classes.container} container column`}>
            <ScrollBar>

                <div className={`row jc-between ai-center`} style={{height:"65vh"}}>
                    <div className={`width-30`}>

                    </div>
                    <div className={`width-30`}>
                        <Spinner/>
                    </div>
                    <div className={`width-30`}>

                    </div>

                </div>


                <div className={`width-90 m-auto overflowX-hidden`} style={{height:"25vh"}}>

                    {/*<MarketSliders/>*/}

                </div>

                <div className={`my-4 width-90 m-auto`}>

                    <MarketInfo/>

                </div>








                <Footer/>


            </ScrollBar>

        </div>
    );
};

export default Content;