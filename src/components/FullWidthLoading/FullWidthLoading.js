import React from 'react';
import classes from './FullWidthError.module.css'

const FullWidthLoading = () => {
    return (
        <div className={`container ${classes.container} flex jc-center ai-center`}>
            <div className="row ai-center jc-center">
                <div className={`${classes.dash} ${classes.one}`} />
                <div className={`${classes.dash} ${classes.two}`} />
                <div className={`${classes.dash} ${classes.three}`} />
                <div className={`${classes.dash} ${classes.four}`} />
            </div>
        </div>
    );
};

export default FullWidthLoading;

