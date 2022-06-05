import React, {useEffect, useState} from "react";
import classes from "./ActionSheet.module.css";
import {useNavigate} from "react-router-dom";

const ActionSheet = ({children , show , onChangeShow}) => {

    const navigate = useNavigate();

    const [showAction, setShowAction] = useState(show);
    const [isFirst, setIsFirst] = useState(false);

    useEffect(() => {
        setShowAction(show)
    }, [show]);

    useEffect(() => {
        onChangeShow(showAction)
    }, [showAction]);


    useEffect(() => {
        return navigate.listen(() => {
            setShowAction(false)
        })
    },[navigate])

    const onClickHandler = ()=> {
        setShowAction(false)
        setIsFirst(true)

    }
    const classHandler = ()=> {
       if (isFirst && !showAction){
           return classes.close
       }
       if (showAction){
           return classes.show
       }
    }

    return (
        <>
            <div className={`container ${classes.wrapper} ${ showAction ? classes.show : ""}`} onClick={onClickHandler}/>
            <div className={`container ${classes.container} column jc-end py-2  ${classHandler()}`}>
                <div className={`${classes.header} flex jc-center ai-center pb-1`} onClick={onClickHandler}><span/></div>
                {children}
            </div>
        </>
    );
};

export default ActionSheet;