import React, {useEffect, useRef} from "react";
import {Scrollbars} from "rc-scrollbars";
import {useLocation} from "react-router-dom";

const ScrollBar = ({customClass, ...props}) => {

    const location = useLocation();
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollTop()
    }, [location.pathname]);

  const style = props.style ? props.style : {width: "100%", height: "100%"};
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      renderThumbHorizontal={(props) => (
        <div {...props} className="thumb-horizontal" />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="thumb-vertical" />
      )}
      renderView={(props) => <div {...props} className={`scrollView ${customClass && customClass}`} />}
      ref={scrollRef}
      style={style}>
      {props.children}
    </Scrollbars>
  );
};

export default ScrollBar;
