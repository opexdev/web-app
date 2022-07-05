import React from "react";
import {useSelector} from "react-redux";
import ScrollBar from "../../../../../../../../../../components/ScrollBar";
import MarketPairCard from "../MarketPairCard/MarketPairCard";

const MarketCard = ({type, ...props}) => {
    let all = useSelector((state) => state.exchange.symbols)

    if (type === "fav") {
        all = all.filter(p => props.favPair.includes(p.symbol))
    }

    if (type !== "all" && type !== "fav") {
        all = all.filter(p => (p.baseAsset === type || p.quoteAsset === type))
    }

    return (
        <div style={{height: "100%"}}>
            <ScrollBar>
                {all.map((pair) => <MarketPairCard {...props} pair={pair} key={pair.symbol}/>)}
            </ScrollBar>
        </div>
    );
};

export default MarketCard;
