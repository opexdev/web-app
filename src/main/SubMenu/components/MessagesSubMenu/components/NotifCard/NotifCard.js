import React, {Fragment, useState} from "react";
import classes from "./NotifCard.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import Icon from "../../../../../../components/Icon/Icon";

const NotifCard = (props) => {
  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    notif: null,
  });
  return (
    <div style={{height: "100%"}}>
      <ScrollBar>
        <div
          className={`container column jc-center px-05  ${classes.container} `}>
          <div className={`container row font-size-sm-plus`}>
            <div className="col-10 row jc-center ai-center">
              <span className={`mx-025 pl-05 ${classes.notifTime}`}>16:24</span>
            </div>
            <div className="col-90 container row jc-between ai-center">
              <span className={`mr-025`}>عدم تایید معامله</span>
              <Icon
                iconName="icon-menu_vertical font-size-sm-plus flex"
                customClass={`cursor-pointer ${classes.iconBG}`}
              />
            </div>
          </div>
        </div>
      </ScrollBar>
    </div>
  );
};

export default NotifCard;
