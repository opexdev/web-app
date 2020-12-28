import React from "react";
import {Scrollbars} from 'rc-scrollbars';

const ScrollBar = (props) => {
    const style = props.style ? props.style : { width: "100%", height: "100%" };
    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
            renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
            style={style}>
            {props.children}
        </Scrollbars>
    );
};

export default ScrollBar;