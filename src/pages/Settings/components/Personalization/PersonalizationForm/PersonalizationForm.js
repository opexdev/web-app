import React, {useState, useEffect} from "react";
import classes from "./PersonalizationForm.module.css";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../components/TextInput/TextInput";

const PersonalizationForm = () => {
  const {t} = useTranslation();
  const [personalization, setPersonalization] = useState({
    defaultLanguage: "",
    defaultTheme: "",
    calendarSystem: "",
    timeZone: "",
    referenceCurrency: "",
    referenceCryptoCurrency: "",
  });

  const defaultLanguageOptions = [
    {value: "persian", label: "فارسی"},
    {value: "english", label: "انگلیسی"},
    {value: "arabic", label: "عربی"},
  ];
  const defaultThemeOptions = [
    {value: "right", label: "روشن"},
    {value: "dark", label: "تاریک"},
  ];
  const calendarSystemOptions = [
    {value: "1", label: "هجری شمسی"},
    {value: "2", label: "میلادی"},
  ];
  const timeZoneOptions = [
    {value: "1", label: "آسیا/تهران/03:30+"},
    {value: "2", label: "..."},
    {value: "3", label: "..."},
  ];
  const referenceCurrencyOptions = [
    {value: "IRT", label: "تومان"},
    {value: "BTC", label: "بیتکوین"},
    {value: "USDT", label: "تتر"},
    {value: "ETH", label: "اتریوم"},
    {value: "BCH", label: "بیتکوین کش"},
  ];
  const referenceCryptoCurrencyOptions = [
    {value: "IRT", label: "تومان"},
    {value: "BTC", label: "بیتکوین"},
    {value: "USDT", label: "تتر"},
    {value: "ETH", label: "اتریوم"},
    {value: "BCH", label: "بیتکوین کش"},
  ];

  return (
    <div className="container py-2">
      <div
        className={` card-background card-border column ${classes.container}`}>
        <div
          className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
          <div className="row jc-start ">
            <h3>شخصی سازی</h3>
          </div>
        </div>
        <div
          className={`container column jc-between ai-center px-1 py-2 ${classes.content}`}>
          <div className="row jc-between">
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="زبان پیش فرض"
                type="text"
                options={defaultLanguageOptions}
                onchange={(e) =>
                  setPersonalization({
                    ...personalization,
                    defaultLanguage: e.value,
                  })
                }
              />
            </div>
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="تم پیش فرض"
                type="text"
                options={defaultThemeOptions}
                onchange={(e) =>
                  setPersonalization({
                    ...personalization,
                    defaultTheme: e.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row jc-between">
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="سیستم روزشماری"
                type="text"
                options={calendarSystemOptions}
                onchange={(e) =>
                  setPersonalization({
                    ...personalization,
                    calendarSystem: e.value,
                  })
                }
              />
            </div>
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="منطقه زمانی"
                type="text"
                options={timeZoneOptions}
                onchange={(e) =>
                  setPersonalization({...personalization, timeZone: e.value})
                }
              />
            </div>
          </div>
          <div className="row jc-between">
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="ارز مرجع"
                type="text"
                options={referenceCurrencyOptions}
                onchange={(e) =>
                  setPersonalization({
                    ...personalization,
                    referenceCurrency: e.value,
                  })
                }
              />
            </div>
            <div className="col-49">
              <TextInput
                select={true}
                placeholder="انتخاب"
                lead="رمز ارز مرجع"
                type="text"
                options={referenceCryptoCurrencyOptions}
                onchange={(e) =>
                  setPersonalization({
                    ...personalization,
                    referenceCryptoCurrency: e.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row jc-end pt-1">
            <button
              type="submit"
              className={`cursor-pointer ${classes.button}`}>
              ذخیره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationForm;
