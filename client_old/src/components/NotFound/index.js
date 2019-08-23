import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

class NotFound extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool,
    isUser: PropTypes.bool
  };

  static defaultProps = {
    isAdmin: false,
    isUser: false
  };

  render() {
    return (
      <div className="container">
        <div className="NotFound--wrapper">
          <h1 className="text-centered">404 Not Found</h1>
          <p className="text-centered">
            The page you were looking for does not exist... Maybe you were
            looking for one of the following?
          </p>
          <Link to="/challenges">Challenge listing</Link>
          <Link to="/">Home page</Link>
          <Link to="/admin">Admin panel</Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
