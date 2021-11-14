import React, {Fragment, useState} from "react";
import classes from "./TheSubHeader.module.css";
import Icon from "../../../../components/Icon/Icon";

const TheSubHeader = (props) => {

    const [expand, setExpand] = useState(false)

    const content = () => {
        if (expand) {
            return <div className={`container column jc-between ai-center ${classes.container} pt-1 px-5`}>
                <div className={`container row jc-between ai-center pb-1`}>
                    <span>موجودی:</span>
                    <span>0.0005 بیتکوین | 1،564،666 تومان</span>
                </div>
                <Icon iconName="icon-dot-3 font-size-md flex" customClass={`${classes.thisIcon} py-05`} onClick={()=>setExpand(false)}/>
            </div>
        }
        if (!expand) {
            return <div className={`container flex ai-center jc-center ${classes.expand}`}>
                <Icon iconName="icon-dot-3 font-size-md flex" customClass={`${classes.thisIcon}`} onClick={()=>setExpand(true)}/>
            </div>
        }
    }


    return (
        content()
    );

};


export default TheSubHeader;