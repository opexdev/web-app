import React from 'react';
import classes from './MarketTitle.module.css'
import {useTranslation} from "react-i18next";
import {Login, Dashboard} from "../../../../../../routes/routes";
import {Link, useNavigate} from "react-router-dom";
import Icon from "../../../../../../components/Icon/Icon";
import Button from "../../../../../../components/Button/Button";

const MarketTitle = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const buttonTitle = <Icon iconName="icon-op-02 flex font-size-md-plus" customClass={`flex jc-center ai-center`}/>



    return (
        <div className={`${classes.container} column jc-between card-background card-border px-1 py-2`}>
            <p className={`font-size-md`}><span
                className={`text-orange font-size-md-01`}>{t("title")}</span> {t("MarketTitle.content")}</p>

            <div className={`column`}>
                <div className={`row mb-1`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={"#"} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>خرید فروش آسان</Link>
                </div>
                <div className={`row mt-1`}>
                    <span className={`${classes.arrow} ml-05`}></span>
                    <Link to={Dashboard} className={`mr-05 cursor-pointer hover-text hover-scale-01`}>خرید فروش حرفه
                        ای</Link>
                </div>
            </div>


            <div className={`row jc-start ai-center`}>


                <Button
                    buttonClass={`${classes.thisButton} hover-text`}
                    type="button"
                    onClick={() => window.open(`https://github.com/opexdev`)}
                    buttonTitle={buttonTitle}
                />

                {/*<Icon iconName="icon-op-04 flex font-size-md-01" customClass={`mx-05 ${classes.bg}`} onClick={()=>window.open(``)}/>
                <Icon iconName="icon-op-02 flex font-size-md-01" customClass={`mx-05 ${classes.bg}`} onClick={()=>window.open(``)}/>
                <Icon iconName="icon-op-05 flex font-size-md-01" customClass={`mx-05 ${classes.bg}`} onClick={()=>window.open(``)}/>
                <Icon iconName="icon-op-06 flex font-size-md-01" customClass={`mx-05 ${classes.bg}`} onClick={()=>window.open(``)}/>
                <Icon iconName="icon-op-03 flex font-size-md-01" customClass={`mx-05 ${classes.bg}`} onClick={()=>window.open(``)}/>*/}
            </div>

        </div>
    );
};

export default MarketTitle;
