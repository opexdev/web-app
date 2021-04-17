import React, {Fragment, useEffect, useState} from "react";
import classes from "./MessagesSubMenu.module.css";
import {images} from "../../../../assets/images";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import NotifCard from "./components/NotifCard/NotifCard";
import ScrollBar from "../../../../components/ScrollBar";
import moment from "moment-jalaali";
import Icon from "../../../../components/Icon/Icon";
import {MyMessagesData, newsData} from "../../../../FakeData/FakeData";

const MessagesSubMenu = (props) => {
  const {t} = useTranslation();
  const [openItem, setOpenItem] = useState({
    myMessages: null,
    news: null,
  });
  const [customData, setCustomData] = useState({
    myMessages: [],
    news: [],
  });
  useEffect(() => {
    setCustomData({
      myMessages: MyMessagesData(),
      news: newsData(),
    });
  }, []);

  const MyMessagesTable = (
    <ScrollBar>
      <table
        className="text-center triplet-striped font-size-sm-plus mt-05"
        cellSpacing="0"
        cellPadding="0">
        <thead></thead>
        <tbody>
          {customData.myMessages.map((tr, index) => (
            <Fragment key={index}>
              <tr>
                <td className="text-right font-weight-bold pr-1">
                  {t("messagesTitle." + tr.title)}
                </td>
                {/*<td className="text-left"></td>*/}
                <td className="text-left pl-1">
                  {moment(tr.timestamp).format("HH:mm:ss  -  jYY/jMM/jDD")}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div
                    className="row jc-between px-1 ai-center"
                    style={{width: "100%"}}>
                    <span className="font-size-sm">خط اول متن پیام</span>

                    {openItem.myMessages === index ? (
                      <span
                        onClick={() =>
                          setOpenItem({...openItem, myMessages: null})
                        }>
                        <Icon
                          iconName="icon-up-open icon-blue font-size-sm"
                          customClass={`${classes.iconBG} cursor-pointer`}
                        />
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          setOpenItem({...openItem, myMessages: index})
                        }>
                        <Icon
                          iconName="icon-down-open icon-blue font-size-sm"
                          customClass={`${classes.iconBG} cursor-pointer`}
                        />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
              <tr
                style={{
                  display: openItem.myMessages === index ? "revert" : "none",
                }}>
                <td colSpan="3" className={`pt-05 pb-2 px-1`}>
                  <div className="col-100 text-start font-size-sm">
                    <p>
                      متن کامل پیام متن کامل پیام متن کامل پیام متن کامل پیام
                      متن کامل پیام متن کامل پیام متن کامل پیام متن کامل پیام
                      متن کامل پیام متن کامل پیام متن کامل پیام متن کامل پیام{" "}
                    </p>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );

  const newsTable = (
    <ScrollBar>
      <table
        className="text-center triplet-striped font-size-sm-plus mt-05"
        cellSpacing="0"
        cellPadding="0">
        <thead></thead>
        <tbody>
          {customData.news.map((tr, index) => (
            <Fragment key={index}>
              <tr>
                <td className="text-right font-weight-bold pr-1">
                  عنوان اطلاعیه
                </td>
                {/*<td className="text-left"></td>*/}
                <td className="text-left pl-1">
                  {moment(tr.timestamp).format("HH:mm:ss  -  jYY/jMM/jDD")}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div
                    className="row jc-between px-1 ai-center"
                    style={{width: "100%"}}>
                    <span className="font-size-sm">خط اول متن اطلاعیه</span>

                    {openItem.news === index ? (
                      <span
                        onClick={() => setOpenItem({...openItem, news: null})}>
                        <Icon
                          iconName="icon-up-open icon-blue font-size-sm"
                          customClass={`${classes.iconBG} cursor-pointer`}
                        />
                      </span>
                    ) : (
                      <span
                        onClick={() => setOpenItem({...openItem, news: index})}>
                        <Icon
                          iconName="icon-down-open icon-blue font-size-sm"
                          customClass={`${classes.iconBG} cursor-pointer`}
                        />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
              <tr
                style={{display: openItem.news === index ? "revert" : "none"}}>
                <td colSpan="3" className={`pt-05 pb-2 px-1`}>
                  <div className="col-100 text-start font-size-sm">
                    <p>
                      متن کامل اطلاعیه متن کامل اطلاعیه متن کامل اطلاعیه متن
                      کامل اطلاعیه متن کامل اطلاعیه متن کامل اطلاعیه متن کامل
                      اطلاعیه متن کامل اطلاعیه متن کامل اطلاعیه متن کامل اطلاعیه
                      متن کامل اطلاعیه متن کامل اطلاعیه{" "}
                    </p>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </ScrollBar>
  );

  const data = [
    {id: 1, title: t("MessagesSubMenu.myMessages"), body: MyMessagesTable},
    {id: 2, title: t("MessagesSubMenu.news"), body: newsTable},
  ];

  return (
    <div className={`container card-background ${classes.container}`}>
      <AccordionBox
        title={t("MessagesSubMenu.title")}
        style={classes}
        ItemsBorderTop="true"
        content={data}
        safari={classes.safariFlexSize}
      />
    </div>
  );
};

export default MessagesSubMenu;
