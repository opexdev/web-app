import React from "react";
import Icon from "../Icon/Icon";
import Select from "react-select";
import classes from "./TextInput.module.css";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import englishGregorian from "react-date-object/locales/gregorian_en";
import farsiGregorian from "react-date-object/locales/gregorian_fa";
import englishJalali from "react-date-object/locales/persian_en";
import farsiJalali from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import {useSelector} from "react-redux";
import i18n from "i18next";

const TextInput = (props) => {
    const {
        customRef,
        readOnly,
        onchange,
        customClass,
        options,
        lead,
        after,
        select,
        alerts,
        max,
        ltr,
        info,
        datePicker,
        ...other
    } = props

    const theme = useSelector((state) => state.global.theme)
    const type = useSelector((state) => state.exchange.dateType)

    const optionClassHandler = (state) => {
        let className = classes.selectOptions

        if (state.isFocused) {
            className = className + " " + classes.isFocused
        }
        if (state.isSelected) {
            className = className + " " + classes.isSelected
        }

        return className;
    }

    const calenderTypeHandler = () => {
        if (type === "Hijri" && i18n.language === "en") {
            return englishGregorian
        }
        if (type === "Hijri" && i18n.language === "fa") {
            return farsiGregorian
        }
        if (type === "Jalali" && i18n.language === "en") {
            return englishJalali
        }
        if (type === "Jalali" && i18n.language === "fa") {
            return farsiJalali
        }
    };

    let leadSection = null
    let afterSection = null
    let alertSection = null

    let inputSection = <input
        ref={customRef}
        readOnly={readOnly}
        onChange={onchange}
        max={max}
        className={`${classes.input} input`}
        style={{direction: ltr && 'ltr'}}
        {...other}
    />

    if (lead) {
        leadSection = <span className={`lead ${classes.lead}`}>{lead}</span>
    }

    if (select) {
        inputSection = <Select
            classNames={{
                option: (state) => optionClassHandler(state),
                menuList: () => `${classes.menuList}`,
                menu: () => `${classes.menu}`,
            }}
            onChange={onchange}
            options={options}
            ref={customRef}
            classNamePrefix="select"
            className={`${classes.selectBox} selectExternalClass`}
            {...other}
        />
    }
    if (datePicker) {
        inputSection = <DatePicker
            className={`${theme === "DARK" ? "bg-dark" : ""}`}
            locale={calenderTypeHandler()}
            calendar={type === "Jalali" ? persian : gregorian}
            onChange={onchange}
            render={<input className={`${classes.datePicker}`}/>}
            {...other}
        >
        </DatePicker>
    }
    if (after) {
        afterSection = <span className={`after ${classes.after}`}>{after}</span>
    }

    if (alerts) {
        alertSection = <div
            className={`${classes.inputGroupHint} inputGroupHint `}
            data-tooltip-id="opex-tooltip"
            data-tooltip-place="left"
            data-tooltip-float={true}
            data-tooltip-html={props.hint}>
            <Icon
                iconName={`${classes.iconInfo} text-white fs-0-7 flex`}
                customClass="hint-icon"
            />
            <div className="column pt-05">
                {alerts.map((alert, index) => <span key={index} className={`${classes.alert} pr-05 `}>{alert}</span>)}
            </div>
        </div>
    }

    return (
        <div className={customClass ?? ""}>
            <div className={classes.inputGroup}>
                {leadSection}
                {inputSection}
                {afterSection}
            </div>
            {alertSection}
        </div>
    );
};


export default TextInput;



