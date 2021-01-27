import React , {useEffect} from 'react';
import classes from "./OrderBookTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";


import i18n from "i18next";
import ReactTooltip from "react-tooltip";
import {connect} from "react-redux";



const OrderBookTable = (props) => {

    const {t} = useTranslation();

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    let header;
    let avg = {price:0,amount:0,total:0}
    let start= "right"
    let end = "left"

    if( i18n.language === "en"){
        start = "left"
        end = "right"
    }

    if (props.type === "buy") {
        header = <tr>
            <th>{t('price')}
            </th>
            <th>{t('volume')}</th>
            <th>{t('totalPrice')}</th>
        </tr>
    } else {
        header = <tr>
            <th>{t('totalPrice')}</th>
            <th>{t('volume')}</th>
            <th>{t('price')}</th>
        </tr>
    }

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
                                        data-html={true}
                                        data-place="bottom"
                                        data-effect="float"
                                        data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('averagePrice')}:</span>
                                                    <span >${((avg.price =avg.price + tr.price) / (index+1)).toFixed(props.activePair.quoteMaxDecimal).toLocaleString() }</span>
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
                                        `}>
                                        <td>{tr.price.toLocaleString()}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.totalPrice.toLocaleString()}</td>
                                    </tr>
                                    :
                                    <tr key={index} style={barStyle}
                                        data-html={true}
                                        data-place="bottom"
                                        data-effect="float"
                                        data-tip={`
                                            <div class="column jc-between col-100">
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('averagePrice')}:</span>
                                                    <span >${((avg.price = avg.price + tr.price) / (index+1)).toFixed(props.activePair.quoteMaxDecimal).toLocaleString() }</span>
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
                                        `}>

                                        <td>{tr.totalPrice.toLocaleString()}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.price.toLocaleString()}</td>
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

export default  connect( mapStateToProps , null )(OrderBookTable);

