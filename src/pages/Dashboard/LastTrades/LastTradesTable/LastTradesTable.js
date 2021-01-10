import React from 'react';
import classes from "./LastTradesTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import {connect} from "react-redux";


const LastTradesTable = (props) => {
    const {t} = useTranslation();
    const [p1,p2]= props.activePair.split("/")
    return (
        <div className={`column container ${classes.container}`}>
            <ScrollBar>
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    <thead>
                    <th>{t('LastTrades.date')}</th>
                    <th>{t('LastTrades.volume')}({p1})</th>
                    <th>{t('LastTrades.price')}({p2})</th>
                    <th>{t('LastTrades.totalPrice')}</th>
                    </thead>
                    <tbody>
                    {props.data.map((tr) =>
                    <tr key={tr.id} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)")}}>
                        <td style={{direction:"ltr",textAlign:"left"}}>{moment(tr.timestamp).format('jYY/jMM/jDD HH:mm:ss')}</td>
                        <td>{tr.AmountBTC}</td>
                        <td>{tr.CountIRRT}</td>
                        <td>{tr.totalPrice}</td>
                    </tr>)}
                    </tbody>
                </table>
            </ScrollBar>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        activePair : state.global.activePair,
    }
}

export default  connect( mapStateToProps , null )(LastTradesTable);