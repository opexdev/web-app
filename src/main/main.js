import React, {lazy} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {isBrowser} from "react-device-detect";

const Main = ({baseURL}) => {

    const Mobile = lazy(() => import('./Mobile/Mobile'))
    const Browser = lazy(() => import('./Browser/Browser'))

    return <Router basename={baseURL}>{isBrowser ? <Browser/> : <Mobile/>}</Router>

};

export default Main;