import React from 'react';
import classes from './MarketTitle.module.css'
import {useTranslation} from "react-i18next";
import {EasyTrading, Panel} from "../../../../Routes/routes";
import {Link} from "react-router-dom";
import Icon from "../../../../../../components/Icon/Icon";
import Button from "../../../../../../components/Button/Button";

const MarketTitle = () => {

    const {t} = useTranslation();

    const isDevelopment = window.env.REACT_APP_ENV === "development";

    const buttonTitle = <Icon iconName="icon-op-02 flex fs-04" customClass={`flex jc-center ai-center py-1`}/>

    return (
        <div className={`${classes.container} column jc-between card-bg card-border px-2 py-3`}>
            <p className={`fs-01`}>
                <span className={`text-orange fs-02`}>{t("title")}</span> {t("MarketTitle.content")}
            </p>
            <div className={`column`}>
                <div className={`row jc-start ai-center my-1 ${classes.flashit}`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={Panel} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>{t("MarketTitle.advancedTrading")}</Link>
                </div>
                <div className={`row jc-start ai-center my-1`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={EasyTrading} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>{t("MarketTitle.easyTrading")}</Link>
                </div>
            </div>
            { isDevelopment && <div className={`row jc-start ai-center`}>
                <Button
                    buttonClass={`${classes.thisButton} hover-text`}
                    type="button"
                    onClick={() => window.open(`https://github.com/opexdev`)}
                    buttonTitle={buttonTitle}
                />
            </div>}
        </div>
    );
};

export default MarketTitle;