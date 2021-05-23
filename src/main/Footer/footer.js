import React from "react";
import classes from "./footer.module.css";
import {images} from "../../assets/images";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";
import {connect} from "react-redux";
import {setThemeInitiate} from "../../store/actions/";

const Footer = (props) => {
  const {t} = useTranslation();
  return (
    <div className={`container column footerBackground ${classes.container}`}>
      <div className={`row jc-between ai-center ${classes.content}`}>
        <div className="row">
          <div className="column px-1">
            <a href="/" title="about_us" target="_blank">
              <span>{t("footer.aboutUs")}</span>
            </a>
            <a href="/" title="contact_us" target="_blank">
              <span>{t("footer.contactUS")}</span>
            </a>
            <a href="/" title="blog" target="_blank">
              <span>{t("footer.blog")}</span>
            </a>
            <a href="/" title="user_manual" target="_blank">
              <span>{t("footer.guide")}</span>
            </a>
            <a href="/" title="Terms_of_use" target="_blank">
              <span>{t("footer.rules")}</span>
            </a>
          </div>
          <div className="column px-1">
            <a href="/" title="Wage" target="_blank">
              <span>{t("footer.wage")}</span>
            </a>
            <a href="/" title="Web_Services" target="_blank">
              <span>{t("footer.api")}</span>
            </a>
            <a href="/" title="Request to add coins or tokens" target="_blank">
              <span>{t("footer.addCoin")}</span>
            </a>
            <a href="/" title="market" target="_blank">
              <span>{t("footer.demo")}</span>
            </a>
            <a href="/" title="Report errors and problems" target="_blank">
              <span>{t("footer.errorReport")}</span>
            </a>
          </div>
        </div>

        <div className={`${classes.footerSetting} `}>
          <div className={`row ai-center py-2`}>
            <span className={`pl-1`}>{t("footer.changeColor")}:</span>
            <div className={classes.onoffswitch}>
              <input
                type="checkbox"
                name="onoffswitch"
                className={classes.onoffswitchCheckbox}
                id="myonoffswitch"
                checked={props.isDark}
                onChange={(e) => props.onThemeChange(e.target.checked)}
              />
              <label
                className={classes.onoffswitchLabel}
                htmlFor="myonoffswitch">
                <span className={classes.onoffswitchInner} />
                <span className={classes.onoffswitchSwitch} />
              </label>
            </div>
          </div>

          <div className={`row ai-center jc-between`}>
            <div className={`row ai-center ${classes.languages}`}>
              <span
                className="cursor-pointer"
                onClick={() => i18n.changeLanguage("fa")}>
                فارسی
              </span>
              <span
                className="cursor-pointer"
                onClick={() => i18n.changeLanguage("en")}>
                English
              </span>
            </div>
          </div>
        </div>

        <div className={classes.footerLogo}>
          <img src={images.opexLogo_light} alt="opexLogo_light" />
        </div>
      </div>
      <div className={classes.navbar}>
        <p>{t("footer.copyright")}</p>
      </div>
      <img src="" alt="" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDark: state.global.isDark,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onThemeChange: (isDark) => dispatch(setThemeInitiate(isDark)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
