import React from 'react';
import classes from './GeneralInfo.module.css'

const GeneralInfo = () => {
    return (
        <div className={`${classes.container} row jc-between ai-center card-background card-border px-1 py-1`}>

            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>100 +</span>
                <span className={`font-size-sm`}>کاربر فعال</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>2000 +</span>
                <span className={`font-size-sm`}>سفارش ثبت شده</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`font-size-md-01`}>700 +</span>
                <span className={`font-size-sm`}>معامله انجام شده</span>
            </div>





        </div>
    );
};

export default GeneralInfo;
