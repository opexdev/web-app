import React from 'react';
import classes from './MarketSlider.module.css'
import { images } from '../../../../../../../../../../assets/images';

const MarketSlider = ({base, price, min, max}) => {




    
    return (
        <>
        <div className={`${classes.container} container text-color column jc-center ai-center ml-2`}>
            <span>{base}</span>
            <img
                 className="img-md flex"
                 src={images[base]}
                 alt={base}
                 title={base}
            />
            <span>{min}</span>
            <span>{max}</span>
            <div className={`${classes.gradient}`}/>
            <img
                className="img-lg ml-05"
                src={images.chart}
                alt={""}
                title={""}
            />



        </div>
        
        </>
    );
};

export default MarketSlider;