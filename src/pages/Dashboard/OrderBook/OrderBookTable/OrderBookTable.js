import React from 'react';
import classes from "./OrderBookTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";

const OrderBookTable = (props) => {

    let header;
    const {t} = useTranslation();
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
                                barStyle = {background: "linear-gradient(to left , var(--textGreenAlpha)   " + (tr.percent) + "%, transparent   " + (tr.percent) + "%) no-repeat"}
                            } else {
                                barStyle = {background: "linear-gradient( to right, var(--textRedAlpha) " + (tr.percent) + "%,   transparent  " + (tr.percent) + "%) no-repeat"};
                            }
                            return (props.type === "buy" ?
                                    <tr key={index} style={barStyle}>
                                        <td>{tr.price.toLocaleString()}</td>
                                        <td>{tr.amount}</td>
                                        <td>{tr.totalPrice.toLocaleString()}</td>
                                    </tr>
                                    :
                                    <tr key={index} style={barStyle}>
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