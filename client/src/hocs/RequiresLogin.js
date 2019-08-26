import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as AuthSelectors from 'redux/auth/selectors';

export default function(ComposedComponent) {
    class RequiresLogin extends React.Component {
        static propTypes = {
            isLoggedIn: PropTypes.bool
        };

        render() {
            if (!this.props.isLoggedIn) return <Redirect to="/" />;
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isLoggedIn: AuthSelectors.isLoggedIn(state)
        };
    };

    return connect(mapStateToProps)(RequiresLogin);
}
