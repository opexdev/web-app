import React, {Fragment} from "react";
import {connect} from "react-redux";


const Chart = (props) => {

    return (
        <div className="px-1 py-1">

            <div className="row">
                <div className="column col-35 pl-05">
                    <span>chart</span>

                </div>
                <div className="column col-65 pr-05">

                </div>
            </div>
            <div className="row">
                <div className="column col-55 pl-05">

                </div>
                <div className="column col-45 pr-05">

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        activePair: state.global.activePair
    }
}

export default connect(mapStateToProps, null)(Chart);