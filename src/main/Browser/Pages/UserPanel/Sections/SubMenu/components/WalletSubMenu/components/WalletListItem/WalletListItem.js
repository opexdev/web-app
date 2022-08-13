import React from "react";
import classes from "../../WalletSubMenu.module.css";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import * as Routes from "../../../../../../../../Routes/routes";
import {BN} from "../../../../../../../../../../utils/utils";
import {useGetUserAccount} from "../../../../../../../../../../queries/hooks/useGetUserAccount";


const WalletListItem = ({name, showZero}) => {
    const {t} = useTranslation();
    const {data: userAccount} = useGetUserAccount()
    const free = userAccount?.wallets[name]?.free || 0

    if (showZero && free === 0) return <></>

    return (
        <NavLink
            className={({isActive}) =>
                isActive ? "container row ai-center cursor-pointer position-relative px-1 py-05 " + classes.selected : "container row ai-center cursor-pointer position-relative px-1 py-05"
            }
            to={Routes.Wallet + "/" + name}>
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
                {new BN(free).toFormat() + " "}
                  <span className="font-size-sm">{t("currency." + name)}</span>
              </span>
                </div>
            </div>
        </NavLink>
    )
}

export default WalletListItem;