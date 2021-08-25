import React, {Fragment, useState} from "react";
import classes from "./Toast.module.css";
import Icon from "../Icon/Icon";
import ToastCard from "./components/ToastCard";

const Toast = (props) => {

    const [count, setCount] = useState([]);

    const toastData = [{
        type:"success",
        text:"سفارش خرید 0.05 BTC با موفقیت ثبت شد"
    }]


    return (
        <div className={`column jc-end ai-center ${classes.container}`}>

            {toastData.map((toastItems) =>
                 <ToastCard data={toastItems}/>
            )}

        </div>
    );
};

export default Toast;
