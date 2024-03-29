import React from "react";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import MarketPairCard from "../MarketPairCard/MarketPairCard";

const MarketCard = ({type, ...props}) => {

    return (
        <div style={{height: "100%"}}>
            <ScrollBar>
                {props.pairs.map((pair) => <MarketPairCard {...props} pair={pair} key={pair.symbol}/>)}
            </ScrollBar>
        </div>
    );
};

export default MarketCard;
