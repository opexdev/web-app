import React from "react";
import classes from "../../WalletSubMenu.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";


const WalletListItem = (props) => {

    const {t} = useTranslation();
    const {route, name, amount} = props

    return (
        <NavLink
            exact={true}
            activeClassName={classes.selected}
            className="container row ai-center cursor-pointer position-relative px-1 py-05"
            to={route}>
            <div className={` row jc-center ai-center ${classes.PairImage}`}>
                <img
                    className={`img-md flex`}
                    src={images[name]}
                    alt={name}
                    title={name}
                />
            </div>
            <div className={`row jc-between px-1 ${classes.pairDetails}`}>
                <div className="column ai-start">
                    <span>{name}</span>
                    <span className="font-size-sm">{t("currency." + name)}</span>
                </div>
                <div className="column ai-end">
              <span>
                {amount + " "}
                  <span className="font-size-sm">{t("currency." + name)}</span>
              </span>
                    <span className="font-size-sm text-color-gray">
                        <span>{t("WalletSubMenu.equivalent")} </span>-{" "}
                        <span>{t("currency.IRT")}</span>
                    </span>
                </div>
            </div>
        </NavLink>
    )
}

export default WalletListItem;
