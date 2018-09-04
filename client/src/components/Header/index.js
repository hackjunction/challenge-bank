import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';

const Header = props => (
  <div className="header">
    <div className="junctionlogo" />
    <div className="row userdata">
      {props.user && props.user.username ? (
        <React.Fragment>
          <p>Logged in as: {props.user.username}</p>
          <a href="/logout">Log out</a>
        </React.Fragment>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
    <div className="container">
      <div className="row">
        <div className="header-content">
          <Link to={`/`}>
            <h2>Challenge Bank</h2>
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            risus lorem, commodo fringilla urna in, venenatis imperdiet mi.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Header);
