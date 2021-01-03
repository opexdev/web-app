import React from 'react';
import Styles from "./OrderBookTable.module.css"
import ScrollBar from "../../../../components/ScrollBar";

const OrderBookTable = (props) => {

    let id = 1;
    const trItems = props.tableDetailes;
    let header = <tr>
        <th>قیمت کل</th>
        <th>مقدار</th>
        <th>قیمت</th>
    </tr>
    let tdItems = trItems.map((tr) =>
        <tr key={id++} style={{background: "linear-gradient( to right, #FAAFB1 "+(tr.Percent)+ "%,   transparent  "+(tr.Percent)+ "%) no-repeat"}}>
          {/*  <span className="position-absolute" style={{width: tr.Percent+ '%' }}/>*/}
            <td>{tr.totalPrice}</td>
            <td>{tr.Amount}</td>
            <td>{tr.Count}</td>
    </tr>);


    if( props.type === "buy"){
        header = <tr>
            <th>قیمت</th>
            <th>مقدار</th>
            <th>قیمت کل</th>
        </tr>
        tdItems = trItems.map((tr) => <tr key={id++} style={{background: "linear-gradient(to left , #A4E0C4   "+(tr.Percent)+ "%, transparent   "+(tr.Percent)+ "%) no-repeat"}}>
            <td>{tr.Count}</td><td>{tr.Amount}</td><td>{tr.totalPrice}</td></tr>);

    }


    return (
        <div className={`column container ${Styles.container}`}>
            <ScrollBar >
                <table className="text-center" cellSpacing="0" cellPadding="0">
                    {header}
                    {tdItems}

                </table>
            </ScrollBar>


        </div>
    );
};

export default OrderBookTable;