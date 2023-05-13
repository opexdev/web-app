import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {isBrowser} from "react-device-detect";
import Browser from "./Browser/Browser";
import Mobile from "./Mobile/Mobile";

const Main = ({baseURL}) => {
    return <Router basename={baseURL}>{isBrowser ? <Browser/> : <Mobile/>}</Router>
};

export default Main;