import React from 'react';
import classes from "./LastTradesTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";


const LastTradesTable = (props) => {
    const {t} = useTranslation();
    let id = 1;
    const trItems = props.tableDetailes;

    let header = <div className="row jc-around py-05">
        <span>{t('LastTrades.date')}</span>
        <span>{t('LastTrades.volume')}(BTC)</span>
        <span>{t('LastTrades.price')}(IRRT)</span>
        <span>{t('LastTrades.totalPrice')}</span>
    </div>

    let tdItems = trItems.map((tr) =>
        <tr key={id++} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)")}}>
            <td>{tr.Moment}</td>
            <td>{tr.AmountBTC}</td>
            <td>{tr.CountIRRT}</td>
            <td>{tr.totalPrice}</td>
        </tr>);

    return (
        <div className={`column container ${classes.container}`}>
            {header}
            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">

                    <tbody>
                    {tdItems}
                    </tbody>
                </table>
            </ScrollBar>
        </div>
    );
};

export default LastTradesTable;