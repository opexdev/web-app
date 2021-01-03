import React from "react";
import classes from "./footer.module.css";
import {images} from "../../assets/images";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setThemeInitiate} from "../../store/actions/";

const Footer = (props) => {
    const {t} = useTranslation();
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.footerLogo}>
                    <img src={images.opexLogo_light} alt="opexLogo_light"/>
                </div>
                <div className={classes.footerSetting}>
                    <div className={classes.row}>
                        <div><img src={images.darkTheme} alt="darkTheme"/></div>
                        <div className={classes.changeTheme}>
                            <span/>
                        </div>
                        { props.isDark ? "dark" : "light"}
                        <div>
                            <div className="toggle toggle--daynight">
                                <input type="checkbox" id="toggle--daynight" className="toggle--checkbox" onChange={e => props.onThemeChange(e.target.checked)} checked={props.isDark}/>
                                <label className="toggle--btn" htmlFor="toggle--daynight">
                                    <span className="toggle--feature"/>
                                </label>
                            </div>
                        </div>
                        <div><img src={images.brightTheme} alt="brightTheme"/></div>

                    </div>
                    <div className={classes.row}>
                        <div><img src={images.languages} alt="languages"/></div>
                    </div>

                </div>
                <div className={classes.list}>
                    <div className={classes.column}>
                        <a href="#" title="about_us" target="_blank"><span>{t('footer.aboutUs')}</span></a>
                        <a href="#" title="contact_us" target="_blank"><span>{t('footer.contactUS')}</span></a>
                        <a href="#" title="blog" target="_blank"><span>{t('footer.blog')}</span></a>
                        <a href="#" title="user_manual" target="_blank"><span>{t('footer.guide')}</span></a>
                        <a href="#" title="Terms_of_use" target="_blank"><span>{t('footer.rules')}</span></a>
                    </div>
                    <div className={classes.column}>
                        <a href="#" title="Wage" target="_blank"><span>{t('footer.wage')}</span></a>
                        <a href="#" title="Web_Services" target="_blank"><span>{t('footer.api')}</span></a>
                        <a href="#" title="Request to add coins or tokens" target="_blank"><span>{t('footer.addCoin')}</span></a>
                        <a href="#" title="market" target="_blank"><span>{t('footer.demo')}</span></a>
                        <a href="#" title="Report errors and problems" target="_blank"><span>{t('footer.errorReport')}</span></a>
                    </div>
                </div>
            </div>
            <div className={classes.navbar}>
                <p>{t('footer.copyright')}</p>
            </div>
            <img src="" alt=""/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isDark: state.global.isDark
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onThemeChange :  (isDark) => dispatch(setThemeInitiate(isDark))
    }
}

export default  connect( mapStateToProps , mapDispatchToProps )(Footer);
