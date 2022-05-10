import React, {lazy} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";


const Main = ({baseURL}) => {

    const Mobile = lazy(() => import('./Mobile/Mobile'))
    const Browser = lazy(() => import('./Browser/Browser'))


    return (
        <Router basename={baseURL}>
            <BrowserView>
                <Browser/>
            </BrowserView>
            <MobileView>
                <Mobile/>
            </MobileView>
        </Router>
    );
};
export default Main;