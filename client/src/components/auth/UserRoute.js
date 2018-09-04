import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default class UserRoute extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Route {...this.props} />;
        }
        return <Redirect to={{ pathname: '/login', state: { onSuccess: this.props.path } }} />;
    }
}
