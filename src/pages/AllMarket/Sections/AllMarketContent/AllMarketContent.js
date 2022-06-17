import React from 'react';
import classes from './AllMarketContent.module.css'
import ScrollBar from "../../../../components/ScrollBar";
import Footer from "../../../../main/Browser/Sections/Footer/Footer";
import Swing from "./components/Swing/Swing";
import {images} from "../../../../assets/images";

const AllMarketContent = () => {


    return (
        <div className={`${classes.container} container column`}>
            <ScrollBar>
                <div className={`row jc-between ai-center px-2`} style={{height:"40vh"}}>
                    <div className={`width-30 column jc-between ai-end`}>

                    </div>
                    <div className={`width-30 flex jc-center ai-start`} style={{position: "fixed", right: "37.5%"}}>
                        <Swing/>


                    </div>
                    <div className={`width-30 flex jc-start`}>

                    </div>
                </div>



                <Footer/>
            </ScrollBar>
        </div>
    );
};

export default AllMarketContent;