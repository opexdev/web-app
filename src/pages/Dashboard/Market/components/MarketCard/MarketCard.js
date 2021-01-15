import React, {Fragment} from 'react';
import classes from "./MarketCard.module.css"
import {images} from "../../../../../assets/images"
import ScrollBar from "../../../../../components/ScrollBar";
import PriceChart from "../../../../../components/PriceChart/PriceChart";
import {useTranslation} from "react-i18next";
import IconBtn from "../../../../../components/IconBtn/IconBtn";




const MarketCard = (props) => {

    const {t} = useTranslation();

    let id = 1;
    const CardData = props.CardData;

    let Items = CardData.map((it) =>
        <div key={id++} className={`container row jc-between ai-center px-05 py-05 ${classes.container}`}>


            <div className={` row jc-between ai-center ${classes.marketCardImage}`}>
                <img className={`img-md flex`} src={it.MarketImage} alt="bitcoin" title="bitcoin"/>
            </div>

            <div className={` row jc-between ai-center ${classes.marketCardContent}`}>
                <div className={`column `}>
                    <span>{t(`pair.${it.MarketName}`)}</span>
                    <div className={`row jc-between ai-center`}>
                        <span>{/*<img className={`img-vsm ${classes.marketCardImg}`} src={images.starWithoutfill} alt="favoriteCurrency"/>*/}
                            <IconBtn iconClass="icon-star text-color font-size-md" iconBG={` ${classes.iconBG}`}/>
                        </span>
                        <span className={`font-size-sm ${ (it.Type) === 'increase'? 'text-green' : 'text-red' } `}>{it.Change}</span>
                    </div>
                </div>

                <div className={`column ai-center`}>

                    <span>چارت</span>
                    {/*<PriceChart/>*/}

                </div>

                <div className={`column  ai-end`}>
                    <p><span>{it.Price}</span> ت</p>
                    <p className="font-size-sm">ح: <span>{it.Amount} ~</span> میلیارد ت</p>
                </div>

            </div>


        </div>

    );


    return (
        <div style={{height: "100%"}}>
            <ScrollBar>
                {Items}
            </ScrollBar>
        </div>
    );
};

export default MarketCard;