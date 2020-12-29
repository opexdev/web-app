import React from "react";
import Styles from "./Header.module.css";
import {images} from "../../assets/images"

const Header = (props) => {
    return (
        <div className={`container row jc-between ai-center ${Styles.container}`}>
            <div className={`row jc-between ai-center ${Styles.content}`}>
                <div className={`column ai-start`}>
                    <h2 className="mb-05">بیتکوین/تومان</h2>
                    <p>آخرین قیمت: <span>410,130,000</span> تومان</p>
                </div>
                <div className={`column ai-center`}>
                    <p className="mb-05">موجودی قابل معامله</p>
                    <div className={`row ai-center ${Styles.inventory}`}>
                        <div className="flex">
                            <img className="img-sm" src={images.plus} alt="plus"/>
                            <span>0.003 </span>
                            <span>بیتکوین</span>
                        </div>
                        <div className="flex">
                            <span>0.12،350،000 </span>
                            <span>تومان</span>
                            <img className="img-sm" src={images.plus} alt="plus"/>
                        </div>
                    </div>
                </div>
                <div className={`column ai-end`}>
                    <p className="mb-05">امیرحسین فردوسی زاده نائینی</p>
                    <p>ساعت <span>01:10</span>، <span>2 بهمن 1399</span></p>
                </div>
            </div>
            <div className={`flex jc-center ai-center ${Styles.signOut}`}>
                <img className="img-md" src={images.signOut} alt="signOut" title="signOut"/>

            </div>
        </div>
    )
};

export default Header;
