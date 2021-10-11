import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";
import Browser from "./Browser/Browser";
import Mobile from "./Mobile/Mobile";


const Main = (props) => {

    return (
        /*basename={"demo"}*/
        /*"homepage":"https://opex.dev/demo"*/
        <Router basename={"demo"}>
            <BrowserView>
                <Browser/>
            </BrowserView>
            <MobileView style={{padding: "2vh 3vw"}}>
                <Mobile/>
            </MobileView>
        </Router>
    );
};

export default Main;
