import React, {Fragment} from "react";
import {connect} from "react-redux";
import PersonalizationForm from "./components/PersonalizationForm/PersonalizationForm";

const Personalization = (props) => {
  return (
    <Fragment>
      <div className="row">
        <PersonalizationForm />
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activePair: state.exchange.activePair,
  };
};

export default connect(mapStateToProps, null)(Personalization);
