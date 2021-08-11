import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAccount} from "./api/wallet";
import {useTranslation} from "react-i18next";
import classes from "./WalletSubMenu.module.css";
import WalletList from "./components/WalletList/WalletList";
import {setUserAccountInfo} from "../../../../store/actions/auth";
import ToggleSwitch from "../../../../components/ToggleSwitch/ToggleSwitch";


const WalletSubMenu = (props) => {
    const {t} = useTranslation();
    const {accessToken, setUserAccountInfo,wallets} = props;
    const [isLoading, setLoading] = useState(true);
    //const [wallets, setWallets] = useState([]);

    useEffect(async () => {
        let account = await getAccount(accessToken)
        if (account.status === 200) {
            const parsedData = parseWalletsResponse(account.data);
            //setWallets(parsedData.wallets);
            setUserAccountInfo(parsedData)
        }
        if (!account) {
            //setWallets(false);
            setLoading(false);
            return false
        }
        setLoading(false)
    }, []);

    const parseWalletsResponse = (res) => {
        let wallets = {}
        res.balances.map((wallet) => {
            wallets[wallet.asset.toUpperCase()] = {
                free: parseFloat(wallet.free.toFixed(6)),
                locked:  parseFloat(wallet.locked.toFixed(6)),
                inWithdrawalProcess: 0,
            }
        })
        delete res.balances;
        delete res.updateTime;
        return {
            ...res,
            wallets:wallets
        };
    }


    return (
        <div className={`container card-background column ${classes.container}`}>
            <div className={`column border-bottom jc-center card-header-bg  ${classes.header}`}>
                <div className="row jc-start ">
                    <h2>{t("WalletSubMenu.title")}</h2>
                </div>
            </div>
            <div className={`column container  ${classes.content}`}>
                <WalletList wallets={wallets} isLoading={isLoading}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        wallets: state.auth.wallets,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUserAccountInfo: (info) => dispatch(setUserAccountInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletSubMenu);
