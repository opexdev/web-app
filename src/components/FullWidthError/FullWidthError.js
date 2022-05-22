import {useDispatch} from "react-redux";
import useQuery from "../../Hooks/useQuery";
import {loadConfig} from "../../store/actions";
import {useTranslation} from "react-i18next";

const FullWidthError = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const query = useQuery();

    const tryLoadConfig = () => {
        const impersonate = query.get("impersonate");
        dispatch(loadConfig(impersonate))
    }
    return (
        <div className="loading-container">
            <div className="column ai-center jc-center">
                <p className="text-center text-color">{t("errorPage.errorText")}</p>
                <button className="button reload-btn mt-05 cursor-pointer" onClick={tryLoadConfig}>{t('errorPage.reload')}</button>
            </div>
        </div>
    );
};
export default FullWidthError;
