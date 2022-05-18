import React from "react";
import classes from "./MarketCard.module.css";
import {useDispatch, useSelector} from "react-redux";
import {images} from "../../../../../../../../assets/images";
import Icon from "../../../../../../../../components/Icon/Icon";
import {BN} from "../../../../../../../../utils/utils";
import {setActivePairInitiate} from "../../../../../../../../store/actions";


const MarketPairCard = ({id, pair,favPair,addFav}) => {

    const activePair = useSelector((state) => state.exchange.activePair.symbol)
    const price = useSelector((state) => state.exchange.lastPrice[pair.symbol])
    const dispatch = useDispatch();

    return (<div onClick={() => dispatch(setActivePairInitiate(pair, id))}
                 className={`container row jc-between ai-center px-1 py-05 cursor-pointer double-striped ${classes.container} ${activePair === pair.symbol ? classes.selected : ""} `}>
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
                                    addFav(pair.symbol);
                                }} data-name={pair.symbol}>
                                    <Icon
                                        iconName={`${favPair.includes(pair.symbol) ? "icon-star-filled" : "icon-star"} text-color font-size-md`}/>
                                </div>
                                {pair.baseAsset +"/"+pair.quoteAsset}
                            </div>
                            <div>
                                { new BN(price).toFormat()}
                            </div>
                        </div>
                    </div>

    );
};


export default MarketPairCard;
