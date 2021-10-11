import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAccount, parseWalletsResponse} from "./api/wallet";
import {useTranslation} from "react-i18next";
import classes from "./WalletSubMenu.module.css";
import WalletList from "./components/WalletList/WalletList";
import {setUserAccountInfo} from "../../../../../../store/actions/auth";


const WalletSubMenu = (props) => {
    const {t} = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const {accessToken, setUserAccountInfo,wallets} = props;

    useEffect(() => {
        const getAccountUseEffect = async () => {
            let account = await getAccount(accessToken)

            if (account.status === 200) {
                const parsedData = parseWalletsResponse(account.data);
                setUserAccountInfo(parsedData)
            }
            if (!account) {
                setLoading(false);
                return false
            }
            setLoading(false)
        }
        getAccountUseEffect()
    }, []);


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
