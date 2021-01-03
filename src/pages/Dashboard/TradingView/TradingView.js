import React from 'react';
import Styles from "./TradingView.module.css"



const TradingView = (props) => {

    return (
        <div className={`container card-background card-border flex jc-center ai-center ${Styles.container}`}>

            <h1 style={{direction:"ltr"}}>TradingView... :)</h1>

        </div>
    );
};

export default TradingView;
