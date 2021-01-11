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
                    <th>{t('LastTrades.time')}</th>
                    <th>{t('LastTrades.date')}</th>
                    <th>{t('LastTrades.volume')}({p1})</th>
                    <th>{t('LastTrades.price')}({p2})</th>
                    <th>{t('LastTrades.totalPrice')}</th>
                    </thead>
                    <tbody>
                    {props.data.map((tr , index) =>
                    <tr key={index} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)")}}>
                        <td style={{direction:"ltr"}}>{moment(tr.timestamp).format('HH:mm:ss')}</td>
                        <td style={{direction:"ltr"}}>{moment(tr.timestamp).format('jYY/jMM/jDD')}</td>
                        <td>{tr.amount}</td>
                        <td>{(tr.price).toLocaleString()}</td>
                        <td>{(tr.totalPrice).toLocaleString()}</td>
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