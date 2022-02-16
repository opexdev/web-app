import React, {Fragment, useEffect, useState} from "react";
import classes from "./MessagesSubMenu.module.css";
import {useTranslation} from "react-i18next";
import moment from "moment-jalaali";
import ScrollBar from "../../../../../../components/ScrollBar";
import Icon from "../../../../../../components/Icon/Icon";
import AccordionBox from "../../../../../../components/AccordionBox/AccordionBox";
import {MyMessagesData, newsData} from "../../../../../../FakeData/FakeData";
import {Link, useHistory} from "react-router-dom";
import {Login} from "../../../../../../routes/routes";

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

  const history = useHistory();

  const MyMessagesTable = (
    <ScrollBar>
      <table
        className="text-center triplet-striped font-size-sm-plus mt-05"
        cellSpacing="0"
        cellPadding="0">
        <thead/>
        <tbody>
          {customData.myMessages.map((tr, index) => (
            <Fragment key={index}>
              <tr>
                <td className="text-right font-weight-bold pr-1">
                  {t("ordersStatus." + tr.title)}
                </td>
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
                 {/* عنوان اطلاعیه*/}
                  راه‌اندازی نمایشی
                </td>
                {/*<td className="text-left"></td>*/}
                <td className="text-left pl-1">
                  {/*{moment(tr.timestamp).format("HH:mm:ss  -  jYY/jMM/jDD")}*/}
                  08:00:00 - 1400/08/01
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div
                    className="row jc-between px-1 ai-center"
                    style={{width: "100%"}}>
                    <span className="font-size-sm">نسخه نمایشی اوپکس راه‌اندازی شد.</span>

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
                      نسخه نمایشی اوپکس، با پشتیبانی از دارایی‌های تستی بیتکوین، اتر و تتر راه‌اندازی شد. می‌توانید در آدرس <span className={`hover-text`} onClick={() => history.push("/login")}>opex.dev</span> حساب کاربری بسازید.{" "}
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

  const NoData = <div className="container height-100 flex ai-center jc-center font-size-sm">{t("noData")}</div>

  const data = [
    //MyMessagesTable
    {id: 1, title: t("MessagesSubMenu.myMessages"), body: NoData},
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
