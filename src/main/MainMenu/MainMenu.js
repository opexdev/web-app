import React from "react";
import Styles from "./MainMenu.module.css";
import {images} from "../../assets/images"
import {Link, NavLink} from "react-router-dom";

const MainMenu = (props) => {
    return (
        <div className={`column ai-center jc-between mainMenu-background ${Styles.container}`}>
           <div className={`column jc-start ai-center`}>
               <Link to="/">
                   <span className="flex"><img className="img-lg" src={images.opexLogo_light} alt="opexLogo_light" title="اوپکس"/></span>
               </Link>
               <NavLink to="/" activeClassName="selected">
                   <span className="flex"><img className="img-md" src={images.market} alt="market" title="بازار"/></span>
               </NavLink>
               <NavLink to="/wallet" activeClassName="selected">
                    <span className="flex"><img className="img-md" src={images.wallet} alt="wallet" title="کیف دارایی ها"/></span>
               </NavLink>
               <NavLink to="/counting" activeClassName="selected">
                     <span className="flex"><img className="img-md" src={images.counting} alt="counting" title="حساب و کتاب"/></span>
               </NavLink>
           </div>
           <div className={`column jc-end ai-center`}>
               <NavLink to="/faq" activeClassName="selected">
                    <span className="flex"><img className="img-md" src={images.messages} alt="messages" title="پیام ها"/></span>
               </NavLink>
               <NavLink to="/faq" activeClassName="selected">
                     <span className="flex"><img className="img-md" src={images.settings} alt="settings" title="تنظیمات"/></span>
               </NavLink>
           </div>
        </div>
    )
};

export default MainMenu;