import React from 'react';
import classes from "./LastTradesTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";


const LastTradesTable = (props) => {
    const {t} = useTranslation();
    let id = 1;
    const trItems = props.tableDetailes;
    let tdItems = trItems.map((tr) =>
        <tr key={id++} style={{color: (tr.Type === "buy" ? "green" : "red")}}>
            <td>{tr.Moment}</td>
            <td>{tr.AmountBTC}</td>
            <td>{tr.CountIRRT}</td>
            <td>{tr.totalPrice}</td>
        </tr>);

    return (
        <div className={`column container ${classes.container}`}>
            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    <tr>
                        <th>{t('LastTrades.date')}</th>
                        <th>{t('LastTrades.volume')}(BTC)</th>
                        <th>{t('LastTrades.price')}(IRRT)</th>
                        <th>{t('LastTrades.totalPrice')}</th>
                    </tr>
                    {tdItems}
                </table>
            </ScrollBar>
        </div>
    );
};

export default LastTradesTable;