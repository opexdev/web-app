import React, {useEffect, useRef, useState} from "react";
import classes from "./AccordionBox.module.css"
import PropTypes from 'prop-types';

const AccordionBox = (props) => {
    const {title, customClass, content,UlMaxWidth,TitleFontSize,ItemsBorderTop} = props;

    const [borderTop, setBorderTop] = useState(false);

    const [btn, setBtn] = useState({left:false, right:false});
    const [body, setBody] = useState(props.content[0].body);
    const [activeHeader, setActiveHeader] = useState(props.content[0].id);
    const ulRef = useRef(null);

    const itemsClickHandler = (el) => {
        setBody(el.body)
        setActiveHeader(el.id)
    }

    const scrollHandler = (ref,move) => {
        const clientWidth = ref.current.clientWidth;
        const scrollWidth = ref.current.scrollWidth;
        const scrollLeft = ref.current.scrollLeft;
        if(move === "left"){
            ref.current.scrollTo({left:scrollLeft-100 ,behavior:"smooth"})
            if((Math.abs(scrollLeft-100)+clientWidth) > scrollWidth){
                setBtn({left: false, right:true})
            }else {
                setBtn({...btn, right:true})
            }
        }
        if(move === "right"){
            ref.current.scrollTo({left:scrollLeft+100 ,behavior:"smooth"})
            if(scrollLeft+100 >= 0){
                setBtn({right: false, left:true})
            }else {
                setBtn({left:true, right:true})
            }
        }
    }
    useEffect(() => {
        const scrollWidth = ulRef.current.scrollWidth;
        const clientWidth = ulRef.current.clientWidth;
        if(scrollWidth > clientWidth){
            setBtn({...btn,left:true})
        }
    }, [])


    return (
        <div className={`${customClass} ${classes.container}`}>
            <div className={`card-header-bg ${classes.header}`}>
                <h3 className={`${props.titleClassName} ${classes.title}`}>{title}</h3>
                <div className={`${classes.items} ${props.headerClassName}`} style={{ borderTop: ItemsBorderTop === true ? setBorderTop==true : ''  }}>
                    <span className={`${classes.leftBtn} ${btn.left ? classes.active : null}`} onClick={()=>scrollHandler(ulRef, "left")}/>
                    <span className={`${classes.rightBtn} ${btn.right ? classes.active : null}`}  onClick={()=>scrollHandler(ulRef, "right")}/>
                    <ul style={{ maxWidth:  UlMaxWidth ? UlMaxWidth : " "}} ref={ulRef}>
                        {content.map(items => {
                            return <li className={activeHeader === items.id ? "active" : ""} onClick={() => itemsClickHandler(items)}
                                       key={items.id}>{items.title}</li>})}
                    </ul>
                </div>
            </div>
            <div className={classes.body}>
                {body}
            </div>
        </div>
    );
}

AccordionBox.prototype = {
    title: PropTypes.string,
    customClass: PropTypes.array,
    content: PropTypes.array,
}

export default AccordionBox;

