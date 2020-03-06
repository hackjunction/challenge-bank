import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as AuthSelectors from "redux/auth/selectors";

export default function(ComposedComponent) {
  class RequiresAdmin extends React.Component {
    static propTypes = {
      isEventAdmin: PropTypes.bool
    };

    render() {
      if (!this.props.isEventAdmin) return <Redirect to="/" />;
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isEventAdmin: AuthSelectors.isEventAdmin(state)
    };
  };

  return connect(mapStateToProps)(RequiresAdmin);
}
