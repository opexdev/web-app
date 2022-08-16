import React, {useState} from 'react';
import classes from './AllMarketInfoCard.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../components/Button/Button";
import {BN} from "../../../../../../../../../../utils/utils";

const AllMarketInfoCard = ({data}) => {


    const {t} = useTranslation();

    const [showButton, setShowButton] = useState(null)

    const backgroundBar = (percent) => {
        if (percent > 0) {
            return {
                background: `linear-gradient(#02002400 0%, #35293326 50%, #27b35a1c 70%, #31cc6a4d 100%)`,
            };
        }
        return {
            background: `linear-gradient(#02002400 0%,#35293326 50%,#dc150717 70%, #e8201236 100%)`,
        };
    }

    const MouseEnterEventHandler = (index) => {
        setShowButton(index)
    }
    const MouseLeaveEventHandler = () => {
        setShowButton(null)
    }



    return (
        <div className={`${classes.container} my-1 px-1`}>

            {data.map((tr, index) => {
                return (
                    <div className={`${classes.item} card-border card-background column cursor-pointer`} style={backgroundBar(tr.priceChange.toString())}
                         onMouseEnter={()=>MouseEnterEventHandler(index)} onMouseLeave={MouseLeaveEventHandler}>

                        <div className={`column jc-between ai-center pt-2 pb-3`} style={{height:"80%"}}>

                            <div className={`row jc-between ai-center width-100 px-1`}>
                                <div className={`row jc-center ai-center`}>
                                    <img  src={images[tr?.pairInfo?.baseAsset]} alt={tr?.pairInfo?.baseAsset}
                                          title={tr?.pairInfo?.baseAsset} className={`img-md-plus ml-05`}/>

                                    <span className={`font-size-md`}>{t("currency." + tr?.pairInfo?.baseAsset)}</span>
                                </div>

                                <div className={`flex jc-end ai-center font-size-sm-mini`}>
                                        <span className={`${tr.priceChange > 0 ? "text-green" : "text-red"} direction-ltr mr-05`}>{new BN(tr.priceChange).toFormat()} %</span>

                                </div>
                            </div>

                            <div className={`column px-1 width-100 font-size-sm`}>
                                <div className={`row jc-between ai-center`}>
                                    <span className={``}>{t("MarketInfo.lastPrice")}:</span>
                                    <span className={`${tr.priceChange > 0 ? "text-green" : "text-red"} font-size-md`}>{new BN(tr.lastPrice).toFormat()}</span>
                                </div>
                                <div className={`row jc-between ai-center`}>
                                    <span className={`text-color-gray`}>{t("MarketInfo.lowPrice")}:</span>
                                    <span>{new BN(tr.lowPrice).toFormat()}</span>
                                </div>
                                <div className={`row jc-between ai-center`}>
                                    <span className={`text-color-gray`}>{t("MarketInfo.highPrice")}:</span>
                                    <span>{new BN(tr.highPrice).toFormat()}</span>
                                </div>
                                <div className={`row jc-between ai-center`}>
                                    <span className={`text-color-gray`}>{t("MarketInfo.volume")}:</span>
                                    <span>{new BN(tr.volume).toFormat()}</span>
                                </div>
                            </div>


                        </div>
                        <div className={`flex jc-center ai-center`} style={{height:"20%"}}>
                            { showButton === index ?
                                <div className={`row jc-between width-90`}>
                                    <Button
                                        buttonClass={`${classes.thisButton} mx-05`}
                                        type="button"
                                        // onClick={() => navigate("/", { replace: true })}
                                        buttonTitle={t("MarketInfo.details")}
                                    />
                                    <Button
                                        buttonClass={`${classes.thisButton} mx-05`}
                                        type="button"
                                        // onClick={() => navigate("/", { replace: true })}
                                        buttonTitle={t("MarketInfo.trade")}
                                    />
                                </div>
                                :
                                <div className={`column jc-center ai-center position-relative`}>
                                    <img
                                        className={`img-lg-2 mb-05 ${classes.filter}`}
                                        src={images.chart}
                                        alt={""}
                                        title={""}
                                    />
                                    <span className={`font-size-sm-mini position-absolute`} style={{left:"35%"}}>{t("comingSoon")}</span>
                                </div>
                            }
                        </div>








                    </div>
                )
            })}

        </div>
    );
};

export default AllMarketInfoCard;
