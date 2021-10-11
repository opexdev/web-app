import React, {Fragment, useState} from "react";
import classes from "./MarketHeader.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {getAccount, parseWalletsResponse} from "../../../SubMenu/components/WalletSubMenu/api/wallet";
import {BN} from "../../../../../../utils/utils";
import useInterval from "../../../../../../Hooks/useInterval";
import Icon from "../../../../../../components/Icon/Icon";
import {setUserAccountInfo} from "../../../../../../store/actions/auth";



const MarketHeader = (props) => {
    const {t} = useTranslation();
    const [currentWallet, setCurrentWallet] = useState({base: "-", quote: "-"})
    const {accessToken, isLogin, setUserAccountInfo, lastTradePrice, activePair} = props

    const getWallet = async () => {
        let accountWallet = await getAccount(accessToken)
        if (accountWallet.status === 200) {
            let base = "-";
            let quote = "-";
            const parsedData = parseWalletsResponse(accountWallet.data);
            setUserAccountInfo(parsedData)
            if(typeof parsedData.wallets[activePair.baseAsset] !== 'undefined'){
                base = new BN(parsedData.wallets[activePair.baseAsset].free).decimalPlaces(activePair.baseAssetPrecision).toFormat();
            }
            if(typeof parsedData.wallets[activePair.quoteAsset] !== 'undefined') {
                quote = new BN(parsedData.wallets[activePair.quoteAsset].free).decimalPlaces(activePair.quoteAssetPrecision).toFormat();
            }
            if (currentWallet.base !== base || currentWallet.quote !== quote) {
                setCurrentWallet({base, quote})
            }
        }
    }

    useInterval(() => {
        getWallet()
    }, isLogin ? 1500 : null);

    return (
        <Fragment>
            <div className={`col-35 column ai-start`}>
                <h2 className="mb-05">{t(`pair.${activePair.name}`)}</h2>
                <p>
                    {t("header.lastPrice")}:{" "}
                    <span>
            {lastTradePrice !== null ? (lastTradePrice
            ) : (
                <span className="flashit">{t('loading')}</span>
            )}
          </span>{" "}
                    {lastTradePrice === null
                        ? ""
                        : t("currency." + activePair.quoteAsset)}
                </p>
            </div>
            <div className={`col-30 column ai-center`}>
                <p className="mb-05">{t("header.availableBalance")}</p>
                <div className={`container row ai-center ${classes.inventory}`}>
                    <div className="col-50 flex ai-center jc-end">
                        <Icon
                            iconName="icon-plus icon-white font-size-sm flex"
                            customClass={`mx-05 ${classes.iconBG}`}
                        />
                        <span>{currentWallet.base}</span>
                        <span>{t("currency." + activePair.baseAsset)}</span>
                    </div>
                    <div className="col-50 flex ai-center  jc-start">
                        <span>{currentWallet.quote}</span>
                        <span>{t("currency." + activePair.quoteAsset)}</span>
                        <Icon
                            iconName="icon-plus icon-white font-size-sm flex"
                            customClass={`mx-05 ${classes.iconBG}`}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.accessToken,
        activePair: state.global.activePair,
        lastTradePrice: state.global.activePairOrders.lastTradePrice
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketHeader);
