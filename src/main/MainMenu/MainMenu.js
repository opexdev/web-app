import React from "react";
import Styles from "./MainMenu.module.css";
import {images} from "../../assets/images"

const MainMenu = (props) => {
    return (
        <div className={`column ai-center jc-between mainMenu-background ${Styles.container}`}>
           <div className={`column jc-start ai-center`}>
               <span className="flex"><img className="img-lg" src={images.opexLogo_light} alt="opexLogo_light" title="اوپکس"/></span>
               <span className="flex"><img className="img-md" src={images.market} alt="market" title="بازار"/></span>
               <span className="flex"><img className="img-md" src={images.wallet} alt="wallet" title="کیف دارایی ها"/></span>
               <span className="flex"><img className="img-md" src={images.counting} alt="counting" title="حساب و کتاب"/></span>
           </div>
           <div className={`column jc-end ai-center`}>
               <span className="flex"><img className="img-md" src={images.messages} alt="messages" title="پیام ها"/></span>
               <span className="flex"><img className="img-md" src={images.settings} alt="settings" title="تنظیمات"/></span>
           </div>
        </div>
    )
};

export default MainMenu;