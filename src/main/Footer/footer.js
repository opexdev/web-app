import React from "react";
import Styles from "./footer.module.css";
import {Images} from "../../assets/images";

const Footer = (props) => {
    return (
       <div className={Styles.container}>
           <div className={Styles.content}>
               <div className={Styles.footerLogo}>
                   <img src={Images.opexLogo_light} alt="opexLogo_light"/>
               </div>
               <div className={Styles.footerSetting}>
                   <div className={Styles.row}>
                       <div><img src={Images.darkTheme} alt="darkTheme"/></div>
                       <div className={Styles.changeTheme}>
                           <span/>
                       </div>
                       <div>
                           <div className="toggle toggle--daynight">
                               <input type="checkbox" id="toggle--daynight" className="toggle--checkbox"/>
                                   <label className="toggle--btn" htmlFor="toggle--daynight">
                                       <span className="toggle--feature"/>
                                   </label>
                           </div>
                       </div>
                       <div><img src={Images.brightTheme} alt="brightTheme"/></div>

                   </div>
                   <div className={Styles.row}>
                       <div><img src={Images.languages} alt="languages"/></div>
                   </div>

               </div>
               <div className={Styles.list}>
                   <div className={Styles.column}>
                       <a href="#" title={"about_us"} target={"_blank"}><span>درباره ما</span></a>
                       <a href="#" title={"contact_us"} target={"_blank"}><span>تماس با ما</span></a>
                       <a href="#" title={"blog"} target={"_blank"}><span>بلاگ</span></a>
                       <a href="#" title={"user_manual"} target={"_blank"}><span>راهنمای استفاده</span></a>
                       <a href="#" title={"Terms_of_use"} target={"_blank"}><span>قوانین استفاده</span></a>
                   </div>
                   <div className={Styles.column}>
                       <a href="#" title={"Wage"} target={"_blank"}><span>کارمزدها</span></a>
                       <a href="#" title={"Web_Services"} target={"_blank"}><span>وب سرویس ها</span></a>
                       <a href="#" title={"Request to add coins or tokens"} target={"_blank"}><span>درخواست افزودن سکه یا توکن</span></a>
                       <a href="#" title={"market"} target={"_blank"}><span>بازار نمایشی (ویژه تمرین رایگان)</span></a>
                       <a href="#" title={"Report errors and problems"} target={"_blank"}><span>گزارش خطا و مشکل</span></a>

                   </div>
               </div>

           </div>
           <div className={Styles.navbar}>
               <p>1400-کلیه حقوق برای اوپکس گستر خاورمیانه محفوظ است.</p>

           </div>


           <img src="" alt=""/>

       </div>
    )
};

export default Footer;
