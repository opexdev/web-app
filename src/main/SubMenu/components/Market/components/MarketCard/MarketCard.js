import React from 'react';
import classes from "./MarketCard.module.css"
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import Icon from "../../../../../../components/Icon/Icon";
import MarketChart from "../MarketChart";
import {images} from "../../../../../../assets/images";
import {setActivePair} from "../../../../../../store/actions";
import {connect} from "react-redux";



const MarketCard = (props) => {

    const {t} = useTranslation();
    const red = getComputedStyle(document.documentElement).getPropertyValue('--textRed')
    const green = getComputedStyle(document.documentElement).getPropertyValue('--textGreen')

    const imageHandler = (pairName) => {
        const [base, quote] = pairName.split("/")
        return images[base]
    }

    let items = props.pairs.map((pair) =>
        <div  onClick={()=>props.onSetActivePair(pair.name)} key={pair.name} className={`container row jc-between ai-center px-05 py-05 cursor-pointer ${classes.container} ${props.activePair === pair.name ? classes.selected :""} `}>
            <div className={` row jc-between ai-center ${classes.marketCardImage}`}>
                <img className={`img-md flex`} src={imageHandler(pair.name)} alt="bitcoin" title="bitcoin"/>
            </div>
            <div className={`row jc-between ai-center ${classes.marketCardContent}`}>
                <div className={`column `}>
                    <span>{pair.name}</span>
                    <div className={`row jc-between ai-center`}>
                        <span onClick={() => props.addFav(pair.name)}>
                            <Icon iconName={`${ props.favPair.includes(pair.name) ? 'icon-star-filled' : 'icon-star' } text-color font-size-md`}/>
                        </span>
                        <span className={`font-size-sm ${ (pair.Type) === 'increase'? 'text-green' : 'text-red' } `}>%{pair.Change}</span>
                    </div>
                </div>
                <div className={`column ai-center`}>
                    <MarketChart color={(pair.Type) === 'increase'? green : red } data={pair.price7d}/>
                </div>
                <div className={`column  ai-end`}>
                    <p><span>{pair.Price}</span> {t('junk.t')}</p>
                    <p className="font-size-sm">{t('junk.vol')}: <span>{pair.Vol} ~</span> {t('junk.billionT')}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{height: "100%"}}>
            <ScrollBar>
                {items}
            </ScrollBar>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        activePair : state.global.activePair.pair,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetActivePair :  (pair) => dispatch(setActivePair(pair))
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(MarketCard);