import React from "react";
import Icon from "../../../../../../components/Icon/Icon";


const HashContent = (props) => {
    const {id , title , text} = props

    return (
        <div className={`width-100 column px-3 py-4`} id={id}>
            <div className={`row ai-center`}>
                <Icon
                    iconName="icon-hash text-green fs-04 flex"
                    iconBG={`bg-red`}
                />
                <h3 className={`text-green`}>{title}</h3>
            </div>
            <div>{text}</div>
        </div>
    );
};

export default HashContent;