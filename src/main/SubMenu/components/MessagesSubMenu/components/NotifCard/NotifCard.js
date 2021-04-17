import React, {Fragment, useState} from "react";
import classes from "./NotifCard.module.css";
import ScrollBar from "../../../../../../components/ScrollBar";
import {useTranslation} from "react-i18next";
import Icon from "../../../../../../components/Icon/Icon";
import {images} from "../../../../../../assets/images";

const NotifCard = (props) => {
  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    notif: null,
  });

  /*let items = props.pairs.map((pair) =>
        <div className={`container row jc-between ai-center px-05 py-05 cursor-pointer ${classes.container}  `}>
            <div className={` row jc-between ai-center ${classes.marketCardImage}`}>
                <img className={`img-md flex`} src={imageHandler(pair.name)} alt={(pair.name)} title={(pair.name)}/>
            </div>
            <div className={`row jc-between ai-center ${classes.marketCardContent}`}>
                <div className={`column `}>
                    <span>{pair.name}</span>
                    <div className={`row jc-between ai-center`}>
                        <span onClick={(e) => {e.stopPropagation();props.addFav(pair.name) }} data-name={pair.name}>
                            <Icon iconName={`${ props.favPair.includes(pair.name) ? 'icon-star-filled' : 'icon-star' } text-color font-size-md`}/>
                        </span>
                        <span className={`font-size-sm ${ (pair.Type) === 'increase'? 'text-green' : 'text-red' } `}>%{pair.Change}</span>
                    </div>
                </div>

                <div className={`column ai-center`}>
                    chart
                </div>
                <div className={`column  ai-end`}>
                    <p><span>{pair.Price}</span> {t('junk.t')}</p>
                    <p className="font-size-sm">{t('junk.vol')}: <span>{pair.Vol} ~</span> {t('junk.billionT')}</p>
                </div>
            </div>
        </div>
    );*/

  return (
    <div style={{height: "100%"}}>
      <ScrollBar>
        {/*{items}*/}
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

          <div></div>
        </div>
      </ScrollBar>
    </div>
  );
};

export default NotifCard;
