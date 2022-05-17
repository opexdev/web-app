import React, {useEffect, useState} from "react";
import classes from "./MarketCard.module.css";
import {connect} from "react-redux";
import {getPrice} from "../../api/market";
import ScrollBar from "../../../../../../../../components/ScrollBar";
import {images} from "../../../../../../../../assets/images";
import Icon from "../../../../../../../../components/Icon/Icon";
import {BN} from "../../../../../../../../utils/utils";
import {setActivePairInitiate} from "../../../../../../../../store/actions";


const MarketCard = (props) => {
    const [symbols, setSymbols] = useState([])

    useEffect(() => {
        setSymbols(props.pairs)
        let newPair = [...props.pairs]
        getPrice().then((res) => {
            if(res && res.status === 200 ){
                newPair = newPair.map((p) => {
                    const pair = res.data.find(b => b.symbol === p.symbol)
                    if(pair) p.price = pair.price
                    return p
                })
            }
            setSymbols(newPair)
        })
    }, [props.pairs])

    return (
        <div style={{height: "100%"}}>
            <ScrollBar>
                {symbols.map((pair) => (
                    <div onClick={() => props.onSetActivePair(pair, props.id)}
                         key={pair.symbol}
                         className={`container row jc-between ai-center px-1 py-05 cursor-pointer double-striped ${classes.container} ${props.activePair === pair.symbol ? classes.selected : ""} `}>
                        <div className={` row jc-between ai-center ${classes.marketCardImage}`}>
                            <img
                                className="img-md flex"
                                src={images[pair.baseAsset]}
                                alt={pair.symbol}
                                title={pair.symbol}
                            />
                        </div>
                        <div className={`row jc-between ai-center ${classes.marketCardContent}`}>
                            <div className="row">
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                    props.addFav(pair.symbol);
                                }} data-name={pair.symbol}>
                                    <Icon
                                        iconName={`${props.favPair.includes(pair.symbol) ? "icon-star-filled" : "icon-star"} text-color font-size-md`}/>
                                </div>
                                {pair.baseAsset +"/"+pair.quoteAsset}
                            </div>
                            <div>
                                {pair.price ? new BN( pair.price).toFormat() : "-"}
                            </div>
                        </div>
                    </div>))}
            </ScrollBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activePair: state.global.activePair.symbol,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActivePair: (pair, activeTab) => dispatch(setActivePairInitiate(pair, activeTab)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketCard);
