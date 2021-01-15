import React from 'react';
import classes from "./OrderBookTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import ReactTooltip from 'react-tooltip';

import i18n from "i18next";



const OrderBookTable = (props) => {

    let header;
    const {t} = useTranslation();
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
            <ReactTooltip data-html={true} data-place="bottom" data-effect="float"/>
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
                                                    <span >${tr.price.toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalVolume')}:</span>
                                                    <span >${tr.amount}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalPrice')}:</span>
                                                    <span >${tr.totalPrice.toLocaleString()}</span>
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
                                                    <span >${tr.price.toLocaleString()}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalVolume')}:</span>
                                                    <span >${tr.amount}</span>
                                                </div>
                                                <div class="row jc-between col-100">
                                                    <span class="pl-05">${t('totalPrice')}:</span>
                                                    <span >${tr.totalPrice.toLocaleString()}</span>
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

export default OrderBookTable;