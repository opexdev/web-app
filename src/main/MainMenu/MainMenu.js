import React , {useEffect} from "react";
import classes from "./MainMenu.module.css";
import {images} from "../../assets/images"
import {Link, NavLink} from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import ReactTooltip from "react-tooltip";



const MainMenu = (props) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <div className={`column ai-center jc-between mainMenu-background ${classes.container}`}>


           <ul className={`column jc-start ai-center ${classes.tabs}`}>
               <Link exact to="/">
                   <span className="flex"><img className="img-lg" src={images.opexLogo_light} alt="opexLogo_light" title="اوپکس"/></span>
               </Link>


               <li>
                   <NavLink exact to="/" activeClassName={classes.selected}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">بازار</span>`}>
                       <Icon iconName="icon-market font-size-lg"/>
                   </NavLink>
               </li>



               <li>
                   <NavLink exact to="/wallet" activeClassName={classes.selected}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">کیف دارایی ها</span>`}>
                       <Icon iconName="icon-wallet font-size-lg"/>
                   </NavLink>
               </li>

               <li>
                   <NavLink exact to="/counting" activeClassName={classes.selected}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">حساب و کتاب</span>`}>
                       <Icon iconName="icon-counting font-size-lg"/>
                   </NavLink>
               </li>

               <li>
                   <NavLink exact to="/account" activeClassName={classes.selected}
                            data-html={true}
                            data-place="left"
                            data-effect="float"
                            data-tip={`
                         <span class="column jc-between col-100">چارت</span>`}>
                       <Icon iconName="icon-account font-size-lg"/>
                   </NavLink>
               </li>
           </ul>
           <div className={`column jc-end ai-center`}>

               <NavLink exact to=" " activeClassName={classes.selected}
                        data-html={true}
                        data-place="left"
                        data-effect="float"
                        data-tip={`
                         <span class="column jc-between col-100">پیام ها</span>`}>
                   <Icon iconName="icon-envelope-open font-size-lg"/>
               </NavLink>

               <NavLink exact to=" " activeClassName={classes.selected}
                        data-html={true}
                        data-place="left"
                        data-effect="float"
                        data-tip={`
                         <span class="column jc-between col-100">تنظیمات</span>`}>
                   <Icon iconName="icon-settings font-size-lg"/>
               </NavLink>
           </div>
        </div>
    )
};

export default MainMenu;