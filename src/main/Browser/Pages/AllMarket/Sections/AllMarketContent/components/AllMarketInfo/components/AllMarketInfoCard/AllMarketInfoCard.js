import React, {useState} from 'react';
import classes from './AllMarketInfoCard.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import Button from "../../../../../../../../../../components/Button/Button";

const AllMarketInfoCard = (props) => {


    const {t} = useTranslation();

    const {data, baseAsset, price, marketCap, lowPrice, highPrice, volume, pcp24h} = props

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
                    <div className={`${classes.item} card-border card-background column cursor-pointer`} style={backgroundBar(tr.pcp24h.toString())}
                         onMouseEnter={()=>MouseEnterEventHandler(index)} onMouseLeave={MouseLeaveEventHandler}>

                        <div className={`column jc-between ai-center pt-2 pb-3`} style={{height:"70%"}}>

                            <div className={`row jc-between ai-center width-100 px-1`}>
                                <div className={`row jc-center ai-center`}>
                                    <img src={images[tr.baseAsset]} alt={tr.baseAsset} title={tr.baseAsset} className={`img-md-plus ml-05`}/>

                                    <span className={`font-size-md`}>{t("currency." + tr.baseAsset)}</span>
                                </div>

                                <div className={`column font-size-sm-mini`}>
                                    <div className={`row jc-end ai-center`}>
                                        <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"} ml-05`}>{tr.pcp24h} %</span>
                                        <span> :24س </span>
                                    </div>
                                    <div className={`row jc-end ai-center`}>
                                        <span className={`${tr.pcp7d > 0 ? "text-green" : "text-red"} ml-05`}>{tr.pcp7d} %</span>
                                        <span> :7ر </span>
                                    </div>

                                </div>
                            </div>

                            <div className={`column px-1 width-100 font-size-sm`}>
                                <div className={`row jc-between ai-center`}>
                                    <span className={``}>{t("MarketInfo.lastPrice")}:</span>
                                    <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"} font-size-md`}>{tr.price}</span>
                                </div>
                                <div className={`row jc-between ai-center`}>
                                    <span className={`text-color-gray`}>{t("MarketInfo.marketCap")}:</span>
                                    <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.marketCap}</span>
                                </div>
                                <div className={`row jc-between ai-center`}>
                                    <span className={`text-color-gray`}>{t("MarketInfo.volume")}:</span>
                                    <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.volume}</span>
                                </div>
                            </div>


                        </div>
                        <div className={`flex jc-center ai-center`} style={{height:"30%"}}>
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
                                <div className={`column jc-center ai-center`}>
                                    <img
                                        className="img-lg-2 mb-05"
                                        src={images.chart}
                                        alt={""}
                                        title={""}
                                    />
                                    <span className={`mt-05 text-color-gray font-size-sm-plus`}>روند 7 روزه</span>
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
