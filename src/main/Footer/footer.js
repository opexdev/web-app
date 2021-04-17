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
            {/*<div><img className="img-md" src={images.darkTheme} alt="darkTheme"/></div>
                        <div className={classes.changeTheme}>
                            <span/>
                        </div>*/}

            {/*<div style={{width:"4vw", height:"8vh", position:"relative"}}>
                            <img src={images.Sun} className={`img-md text-blue`} alt=""/>
                            <span style={{width:"100%" , height:"50%" ,position: "absolute"}} />
                        </div>*/}
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

            {/*<div>
                            <div className="toggle toggle--daynight">
                                <input type="checkbox" id="toggle--daynight" className="toggle--checkbox" onChange={e => props.onThemeChange(e.target.checked)} checked={props.isDark}/>
                                <label className="toggle--btn" htmlFor="toggle--daynight">
                                    <span className="toggle--feature"/>
                                </label>
                            </div>
                        </div>*/}
            {/*<div><img className="flex img-md" src={images.brightTheme} alt="brightTheme"/></div>*/}
          </div>

          <div className={`row ai-center jc-between`}>
            {/*<div><img className="flex img-md" src={images.languages} alt="languages"/></div>*/}
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
