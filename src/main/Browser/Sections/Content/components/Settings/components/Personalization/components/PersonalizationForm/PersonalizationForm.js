import React, {useState} from "react";
import classes from "./PersonalizationForm.module.css";
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../components/Button/Button";


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
    {value: "persian", label: t("Languages.Persian")},
    {value: "english", label: t("Languages.English")},
    {value: "arabic", label: t("Languages.Arabic")}
  ];
  const defaultThemeOptions = [
    {value: "light", label: t("Theme.Light")},
    {value: "dark", label: t("Theme.Dark")},
  ];
  const calendarSystemOptions = [
    {value: "1", label: t("Calendar.1")},
    {value: "2", label: t("Calendar.2")},
  ];
  const timeZoneOptions = [
    {value: "1", label: t("TimeZone.1")},
    {value: "2", label: "..."},
    {value: "3", label: "..."},
  ];
  const referenceCurrencyOptions = [
    {value: "IRT", label: t("currency.IRT")},
    {value: "BTC", label: t("currency.BTC")},
    {value: "USDT", label: t("currency.USDT")},
    {value: "ETH", label: t("currency.ETH")},
    {value: "BCH", label: t("currency.BCH")},
  ];
  const referenceCryptoCurrencyOptions = [
    {value: "IRT", label: t("currency.IRT")},
    {value: "BTC", label: t("currency.BTC")},
    {value: "USDT", label: t("currency.USDT")},
    {value: "ETH", label: t("currency.ETH")},
    {value: "BCH", label: t("currency.BCH")},
  ];

  return (
    <div className="container py-2">
      <div
        className={` card-background card-border column ${classes.container}`}>
        <div
          className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
          <div className="row jc-start ">
            <h3>{t("PersonalizationForm.title")}</h3>
          </div>
        </div>
        <div
          className={`container column jc-between ai-center px-1 py-2 ${classes.content}`}>
          <div className="row jc-between">
            <div className="col-49">
              <TextInput
                select={true}
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultLang")}
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
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultTheme")}
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
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultCalendarSystem")}
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
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultTimeZon")}
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
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultReferenceCurrency")}
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
                placeholder={t("PersonalizationForm.placeholder")}
                lead={t("PersonalizationForm.defaultReferenceCryptoCurrency")}
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

            <Button
                buttonClass={`${classes.thisButton}`}
                buttonTitle={t("PersonalizationForm.save")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationForm;
