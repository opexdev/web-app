import React from 'react';
import classes from './MarketTitle.module.css'
import {useTranslation} from "react-i18next";
import {Panel} from "../../../../../../Routes/routes";
import {Link} from "react-router-dom";
import Icon from "../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../components/Button/Button";

const MarketTitle = () => {

    const {t} = useTranslation();

    const buttonTitle = <Icon iconName="icon-op-02 flex font-size-md-plus" customClass={`flex jc-center ai-center py-1`}/>

    return (
        <div className={`${classes.container} column jc-between card-background card-border px-2 py-3`}>
            <p className={`font-size-md`}>
                <span className={`text-orange font-size-md-01`}>{t("title")}</span> {t("MarketTitle.content")}
            </p>
            <div className={`column`}>
                <div className={`row jc-start ai-center mb-1`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={"#"} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>{t("MarketTitle.easyTrading")}</Link>
                </div>
                <div className={`row jc-start ai-center mt-1 ${classes.flashit}`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={Panel} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>{t("MarketTitle.advancedTrading")}</Link>
                </div>
                {/*<Button
                    buttonClass={`${classes.marketButton} ${classes.easyTradingButton} my-1`}
                    type="button"
                    onClick={() => navigate("", { replace: true })}
                    buttonTitle={t("MarketTitle.easyTrading")}
                />
                <Button
                    buttonClass={`${classes.marketButton} ${classes.advancedTradingButton} my-1`}
                    type="button"
                    onClick={() => navigate(Panel, { replace: true })}
                    buttonTitle={t("MarketTitle.advancedTrading")}
                />*/}
            </div>
            <div className={`row jc-start ai-center`}>
                <Button
                    buttonClass={`${classes.thisButton} hover-text`}
                    type="button"
                    onClick={() => window.open(`https://github.com/opexdev`)}
                    buttonTitle={buttonTitle}
                />
            </div>
        </div>
    );
};

export default MarketTitle;
