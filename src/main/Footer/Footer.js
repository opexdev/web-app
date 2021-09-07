import React from "react";
import classes from "./Footer.module.css";
import {images} from "../../assets/images";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";
import {connect} from "react-redux";
import {setThemeInitiate} from "../../store/actions/";
import {Link} from "react-router-dom";
import {Guide} from "../../routes/routes";

const Footer = (props) => {
  const {t} = useTranslation();
  return (
    <div className={`container column footerBackground ${classes.container}`}>
      <div className={`row jc-between ai-center ${classes.content}`}>
        <div className="row">
          <Link to={Guide} className="row">
            <div className="column px-1">
                <span className="hover-text">{t("footer.aboutUs")}</span>
                <span className="hover-text">{t("footer.contactUS")}</span>
                <span className="hover-text">{t("footer.blog")}</span>
                <span className="hover-text">{t("footer.guide")}</span>
                <span className="hover-text">{t("footer.rules")}</span>
            </div>
            <div className="column px-1">
                <span className="hover-text">{t("footer.wage")}</span>
                <span className="hover-text">{t("footer.api")}</span>
                <span className="hover-text">{t("footer.addCoin")}</span>
                <span className="hover-text">{t("footer.demo")}</span>
                <span className="hover-text">{t("footer.errorReport")}</span>
            </div>
          </Link>
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
