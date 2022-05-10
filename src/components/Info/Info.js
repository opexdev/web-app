import React from "react";
import {useTranslation} from "react-i18next";
import Icon from "../Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {setInfoMessage} from "../../store/actions";

const Info = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const type = useSelector((state) => state.global.info.type)
    const message = useSelector((state) => state.global.info.message)

    if (!message) return <></>

    return (
        <div className={`alert-box row jc-between ai-center px-1 mx-1 my-1 py-05 width-40`}>
            <span className={`font-size-sm-plus`}>{t(message)}</span>
            <Icon
                iconName="icon-cancel text-red flex"
                customClass={`cursor-pointer`}
                onClick={()=> dispatch(setInfoMessage(null, null))}
            />
        </div>
    );
};

export default Info;