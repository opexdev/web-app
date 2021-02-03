import React , {useEffect,useState} from 'react';
import classes from "./OrderBookTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import {connect} from "react-redux";
import {setBestBuyPrice, setBestSellPrice, setBuyOrder, setSellOrder} from "../../../../store/actions";

const OrderBookTable = (props) => {

    const {t} = useTranslation();
    const [selected, setSelected] = useState({buy:-1,sell:-1})

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    let header;
    let avg = {pricePerUnit:0,amount:0,total:0}
    let start= "right"
    let end = "left"

    if( i18n.language === "en"){
        start = "left"
        end = "right"
    }

    if (props.type === "buy") {
        header = <tr>
            <th>{t('pricePerUnit')}</th>
            <th>{t('volume')}</th>
            <th>{t('totalPrice')}</th>
        </tr>
    } else {
        header = <tr>
            <th>{t('totalPrice')}</th>
            <th>{t('volume')}</th>
            <th>{t('pricePerUnit')}</th>
        </tr>
    }
    useEffect(()=>{
        props.type === "buy" ?  props.setBestSellPrice(props.data[0].pricePerUnit) : props.setBestBuyPrice(props.data[0].pricePerUnit)
    },[])

    return (
        <div className={`column container ${classes.container}`}>
            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    <thead>
                    {header}
                    </thead>
                    <tbody>
                    {
                        props.data.map((tr, index) => {
                            let barStyle;
                            if (props.type === "buy") {
                                barStyle = {background: "linear-gradient(to "+end+" , var(--textGreenAlpha)   " + (tr.percent) + "%, transparent   " + (tr.percent) + "%) no-repeat"}
                            } else {
                                barStyle = {background: "linear-gradient( to "+start+", var(--textRedAlpha) " + (tr.percent) + "%,   transparent  " + (tr.percent) + "%) no-repeat"};
                            }
                            return (props.type === "buy" ?
                                    <tr key={index} style={barStyle}
                                        onMouseEnter={()=>setSelected({...selected,sell:index})}
                                        onMouseLeave={()=>setSelected({...selected,sell:-1})}
                                        data-html={true} className={selected.sell >= index ? "selected":""}
                                        data-place="bottom"
                                        data-effect="float"
                                        data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('averagePrice')}:</span>
                                                    <span >${((avg.pricePerUnit =avg.pricePerUnit + tr.pricePerUnit) / (index+1)).toFixed(props.activePair.quoteMaxDecimal).toLocaleString() }</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalVolume')}:</span>
                                                    <span >${(avg.amount = avg.amount + tr.amount).toFixed(props.activePair.baseMaxDecimal).toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalPrice')}:</span>
                                                    <span >${(avg.total = avg.total + tr.totalPrice).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        `}
                                        data-amount={avg.amount}
                                        onClick={(e) => props.onSetSellOrder({
                                            pricePerUnit: tr.pricePerUnit,
                                            amount: parseFloat(e.currentTarget.getAttribute('data-amount'))
                                        })}
                                    >
                                        <td>{tr.pricePerUnit.toLocaleString()}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.totalPrice.toLocaleString()}</td>
                                    </tr>
                                    :
                                    <tr key={index} style={barStyle}
                                        onMouseEnter={()=>setSelected({...selected,buy:index})}
                                        onMouseLeave={()=>setSelected({...selected,buy:-1})}
                                        data-html={true} className={selected.buy >= index ? "selected":""}
                                        data-place="bottom"
                                        data-effect="float"
                                        data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('averagePrice')}:</span>
                                                    <span >${((avg.pricePerUnit = avg.pricePerUnit + tr.pricePerUnit) / (index+1)).toFixed(props.activePair.quoteMaxDecimal).toLocaleString() }</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalVolume')}:</span>
                                                    <span >${(avg.amount = avg.amount + tr.amount).toFixed(props.activePair.baseMaxDecimal).toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalPrice')}:</span>
                                                    <span >${(avg.total = avg.total + tr.totalPrice).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        `}
                                        data-amount={avg.amount}
                                        onClick={(e) => props.onSetBuyOrder({
                                            pricePerUnit: tr.pricePerUnit,
                                            amount: parseFloat(e.currentTarget.getAttribute('data-amount'))
                                        })}
                                    >
                                        <td>{tr.totalPrice.toLocaleString()}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.pricePerUnit.toLocaleString()}</td>
                                    </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </ScrollBar>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        activePair : state.global.activePair,
        activePairOrders : state.global.activePairOrders,
        auth : state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetBuyOrder :  (selected) => dispatch(setBuyOrder(selected)),
        onSetSellOrder :  (selected) => dispatch(setSellOrder(selected)),
        setBestSellPrice :  (bestSellPrice) => dispatch(setBestSellPrice(bestSellPrice)),
        setBestBuyPrice :  (bestBuyPrice) => dispatch(setBestBuyPrice(bestBuyPrice)),
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(OrderBookTable);

