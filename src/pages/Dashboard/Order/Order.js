import React from 'react';
import classes from "./Order.module.css"

const Overview = (props) => {

    return (
        <div className={`${classes.container}`}>
            <div className={classes.header}>

                <div className={classes.title}>
                    <h4>سفارش</h4>
                </div>
                <div className={classes.subTitle}>
                    <span className={classes.activeSubTitle}>خرید</span>
                    <span>فروش</span>

                </div>

            </div>
            <div className={classes.content}>
                <p>موجودی قابل معامله: <span >12،350،000</span> تومان</p>
                <p>بهترین پیشنهاد: <span>450،000،000</span> تومان</p>
            </div>

        </div>
    );
};

export default Overview;