import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import _ from 'lodash';

class UserBlock extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="UserBlock--wrapper">
                <span className="UserBlock--name">{this.props.username}</span>
                <div className="UserBlock--logout-wrapper">
                    <span className="UserBlock--logout-button">Log outtttt</span>
                </div>
            </div>
        );
    }
}

export default UserBlock;
