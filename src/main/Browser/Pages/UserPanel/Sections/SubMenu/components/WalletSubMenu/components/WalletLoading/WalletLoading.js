import React from "react";
import classes from "../../WalletSubMenu.module.css";

const WalletLoading = () => {
    const Loading = () => <div className="width-100 row ai-center py-05">
            <div className={` row jc-center ai-center ${classes.PairImage}`}>
                <span className={`img-md flex ${classes.loadingImg}`}/>
            </div>
            <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                <div className="column ai-start">
                    <span className={classes.loadingText} style={{width: "5vw"}}/>
                    <span className={classes.loadingText} style={{width: "6vw"}}/>
                </div>
                <div className="column ai-end">
                    <span className={classes.loadingText} style={{width: "5vw"}}/>
                    <span className={classes.loadingText} style={{width: "4vw"}}/>
                </div>
            </div>
        </div>

    return (
        <div className={`width-100 card-bg column ${classes.container}`}>
            <Loading/>
            <Loading/>
            <Loading/>
            <Loading/>
        </div>
    )
}

export default WalletLoading;