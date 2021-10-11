import React, {useEffect, useRef, useState} from "react";
/*import classes from "./Guide.module.css";*/
import Icon from "../../../../components/Icon/Icon";


const HashContent = (props) => {
    const {id , title , text} = props


    return (
        <div className={`container column px-3 py-4`} id={id}>
            <div className={`row ai-center`}>
                <Icon
                    iconName="icon-hash text-green font-size-md-plus flex"
                    iconBG={`bg-red`}
                />
                <h3 className={`text-green`}>{title}</h3>
            </div>
            <div>{text}</div>
        </div>
    );
};


export default HashContent;



