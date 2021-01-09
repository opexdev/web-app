import React,{Fragment, useState,useEffect} from 'react';
import classes from "./MyOrders.module.css"
import ScrollBar from "../../../components/ScrollBar";
import {images} from "../../../assets/images"
import AccordionBox from "../../../components/AccordionBox/AccordionBox";



const MyOrders = (props) => {

    const [openItem,setOpenItem] = useState(null)
    const [ttttt,setttt] = useState(null)


    const CurrentOrdersData = [
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "423،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
  /*      {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            percentageDone: 10,
            Type: 'sell'
        },*/
    ];
    const stopData = [
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'sell'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            stopPrice: '413،990،000',
            Type: 'buy'
        },

    ]
    const OrderhistoryData = [
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            status: 'رد شده',
            Type: 'buy'
        },
    ]
    const TradesData = [
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.02",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            TradesID:'67Gj2Acx9043',
            OrderID:'67Gj2Acx9043',
            Type: 'buy'
        },
        {
            Moment: "11/1، 01:10",
            AmountBTC: "0.01",
            CountIRRT: "413،990،000",
            totalPrice: '413،990،000',
            TradesID:'67Gj2Acx9043',
            OrderID:'67Gj2Acx9043',
            Type: 'sell'
        },
    ]

    let id = 1;


        let CurrentOrdersHeader = <div className="row jc-around py-05">
            <span>زمان</span>
            <span>مقدار(BTC)</span>
            <span>قیمت واحد(IRRT)</span>
            <span>قیمت کل</span>
            <span>%انجام</span>
            <span> </span>
            <span> </span>
        </div>

        let CurrentOrdersTdItems = CurrentOrdersData.map((tr) =>

            <tr key={id++} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>
                <td>{tr.Moment}</td>
                <td>{tr.AmountBTC}</td>
                <td>{tr.CountIRRT}</td>
                <td>{tr.totalPrice}</td>
                <td>{tr.percentageDone}</td>
                {/*<td><img className={`img-vsm flex`} src={images.remove} alt="remove" title="remove"/></td>
            <td><img className={`img-vsm flex`} src={images.down} alt="down" title="down"/></td>*/}
                <td><i className="icon-delete flex jc-center text-red font-size-md"/></td>
                <td><i className="icon-down flex jc-center  text-blue font-size-md"/></td>
            </tr>);




        const CurrentOrdersTable =
            <Fragment>
            {CurrentOrdersHeader}
            <ScrollBar>
                <table className="text-center pt-1" cellSpacing="0" cellPadding="0">


                    <tbody>
                    {CurrentOrdersTdItems}
                    </tbody>

                </table>
            </ScrollBar>
            </Fragment>

        let StopTableHeader = <tr>
            <th>زمان</th>
            <th>مقدار(BTC)</th>
            <th>قیمت واحد(IRRT)</th>
            <th>قیمت کل</th>
            <th>ق توقف</th>
            <th> </th>
        </tr>

        let StopTableTdItems = stopData.map((tr) =>

            <tr key={id++} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>
                <td>{tr.Moment}</td>
                <td>{tr.AmountBTC}</td>
                <td>{tr.CountIRRT}</td>
                <td>{tr.totalPrice}</td>
                <td>{tr.stopPrice}</td>

                {/*<td><img className={`img-vsm flex`} src={images.remove} alt="remove" title="remove"/></td>*/}

                <td><i className="icon-delete flex jc-center  text-red font-size-md"/></td>

            </tr>);


        const StopTable =
            <ScrollBar>
                <table className="text-center pt-1" cellSpacing="0" cellPadding="0">

                    {StopTableHeader}
                    {StopTableTdItems}

                </table>
            </ScrollBar>

        let OrderhistoryHeader = <tr>
            <th>زمان</th>
            <th>مقدار(BTC)</th>
            <th>قیمت واحد(IRRT)</th>
            <th>قیمت کل</th>
            <th>وضعیت</th>
            <th> </th>
        </tr>

        let OrderhistoryTdItems = OrderhistoryData.map((tr) =>

            <tr key={id++} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>
                <td>{tr.Moment}</td>
                <td>{tr.AmountBTC}</td>
                <td>{tr.CountIRRT}</td>
                <td>{tr.totalPrice}</td>
                <td>{tr.status}</td>

                {/*<td><img className={`img-vsm flex`} src={images.down} alt="down" title="down"/></td>*/}


                <td><i className="icon-down flex jc-center  text-blue font-size-md"/></td>

            </tr>);


        const OrderhistoryTable =
            <ScrollBar>
                <table className="text-center pt-1" cellSpacing="0" cellPadding="0">

                    {OrderhistoryHeader}
                    {OrderhistoryTdItems}

                </table>
            </ScrollBar>


        let TradesHeader = <tr>
            <th>زمان</th>
            <th>مقدار(BTC)</th>
            <th>قیمت واحد(IRRT)</th>
            <th>قیمت کل</th>
            <th> </th>
        </tr>

        let TradesTdItems = TradesData.map((tr) =>

            <Fragment>
                {console.log(openItem)}
                <tr key={++id} style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>
                    <td>{tr.Moment}</td>
                    <td>{tr.AmountBTC}</td>
                    <td>{tr.CountIRRT}</td>
                    <td>{tr.totalPrice}</td>
                    {/*<td><img className={`img-vsm flex`} src={images.down} alt="down" title="down" onClick={()=>{setOpenItem(tr.AmountBTC); console.log(tr.AmountBTC)}}/></td>*/}
                    <td><i className="icon-down flex jc-center  text-blue font-size-md" onClick={()=>{setOpenItem(tr.AmountBTC); console.log(tr.AmountBTC)}}/></td>
                </tr>
                <tr className={ `${console.log(openItem == tr.AmountBTC) ? "open" : "sss"} `}>
                    <td colSpan="4">
                        <div className={`row jc-around  ai-center`} style={{width:"100%"}}>
                            <p>شناسه معامله: <span style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>{tr.TradesID}</span></p>
                            <p>شناسه سفارش: <span style={{color: (tr.Type === "buy" ? "var(--textGreen)" : "var(--textRed)" )}}>{tr.OrderID}</span></p>
                        </div>
                    </td>
                </tr>
            </Fragment>);


        const TradesTable =
            <ScrollBar>
                <table className="text-center pt-1" cellSpacing="0" cellPadding="0">
                    {TradesHeader}
                    {TradesTdItems}
                </table>
            </ScrollBar>

        const data = [
            {id: 1 , title: "سفارش های جاری" , body: CurrentOrdersTable },
            {id: 2 , title: "متوقف" , body: StopTable},
            {id: 3 , title: "تاریخچه سفارش ها" , body: OrderhistoryTable},
            {id: 4 , title: "معامله ها" , body: TradesTable},
        ]







    return (
        <div className={`container card-background card-border column ${classes.container}`}>

                <AccordionBox title="سفارش ها و معامله های من" content={data}/>

        </div>
    );
};

export default MyOrders;

