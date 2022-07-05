import React from 'react';
import classes from './MarketInfoCard.module.css'
import {images} from "../../../../../../../../../../assets/images";
import {useTranslation} from "react-i18next";

const MarketInfoCard = (props) => {

    const {t} = useTranslation();

    const {data, baseAsset, price, marketCap, lowPrice, highPrice, volume, pcp24h} = props


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

    return (
        <div className={`${classes.container} my-3 px-1`}>

            {data.map((tr, index) => {
                return (
                    <div className={`${classes.item} card-border card-background column jc-between ai-center py-3 cursor-pointer`} style={backgroundBar(tr.pcp24h.toString())}>
                        <div className={`row jc-center ai-center width-100`}>
                            <img src={images[tr.baseAsset]} alt={tr.baseAsset} title={tr.baseAsset} className={`img-lg ml-05`}/>
                            <div className={`column mr-05`}>
                                <span className={`font-size-md`}>{t("currency." + tr.baseAsset)}</span>
                                <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.pcp24h} %</span>
                            </div>
                        </div>

                        <span className={`${tr.pcp24h > 0 ? "text-green" : "text-red"} font-size-md-01`}>{tr.price}</span>

                        <div className={`column jc-center ai-center`}>
                            <img
                                className="img-lg-2 mb-05"
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                            <span className={`mt-05 text-color-gray font-size-sm-plus`}>روند 7 روزه</span>
                        </div>


                    </div>
                )
            })}

        </div>
    );
};

export default MarketInfoCard;