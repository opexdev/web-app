import React, {Fragment} from "react";
import classes from "../Toast.module.css";
import Icon from "../../Icon/Icon";
import {setLastTransaction} from "../../../store/actions/auth";
import {connect} from "react-redux";

const ToastCard = (props) => {

    const {type,text} = props.data
    console.log("toast : " , props.data)
    console.log("toast2 : " , props.data.text)




    const timerStyle ={
        //animation: "timer 5s infinite"
    }

    /* setTimeout(()=>

         , 2000);

 */

    return (
            <div className={`container row ai-center ${classes.toastCard} card-border  font-size-sm`}>
                <div className={`${classes.timer} position-relative`}>
                    <span className={`${classes.timerWrapper}`} style={timerStyle}>

                    </span>

                </div>
                <div className={`${classes.title} row jc-between ai-center px-1`}>
                    <span>{text}</span>
                    <Icon iconName="icon-cancel-circle icon-blue font-size-md" customClass={`${classes.iconBG} cursor-pointer`}/>
                </div>
            </div>
    );
};
const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastCard);