import React, { useEffect } from "react";
import styles from "./Header.module.scss";

import { connect } from "react-redux";
import Countdown from "react-countdown-now";
import moment from "moment";

import Divider from "components/Divider";
import CountdownTimer from "components/CountdownTimer";

import * as ContentSelectors from "redux/content/selectors";
import * as AuthSelectors from "redux/auth/selectors";
import * as AuthActions from "redux/auth/actions";

const Header = ({ user, logout }) => {
  if (!user || !user.event) return null;

  const renderCountdown = () => {
    const { platformOpens, platformCloses } = user.event;
    const now = moment();

    if (now.isBefore(platformOpens)) {
      return (
        <Countdown
          date={platformOpens}
          zeroPadTime={2}
          renderer={props => {
            const { completed } = props;
            const { hours, minutes, seconds } = props.formatted;
            if (completed) {
              return <span className={styles.timeStatus}>The race is on!</span>;
            } else {
              return (
                <CountdownTimer
                  label="Begins in:"
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              );
            }
          }}
        />
      );
    } else {
      return (
        <Countdown
          date={platformCloses}
          zeroPadTime={2}
          renderer={props => {
            const { completed } = props;
            const { hours, minutes, seconds } = props.formatted;
            if (completed) {
              return (
                <span className={styles.timeStatus}>The race has ended!</span>
              );
            } else {
              return (
                <CountdownTimer
                  label="Ends in:"
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              );
            }
          }}
        />
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.bgImage} src={require("assets/coverimage.jpg")} />
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={require("assets/logo_white.png")} />
        <span className={styles.eventName}>{user.event.name}</span>
        {renderCountdown()}
      </div>
      <div className={styles.top}>
        <span className={styles.user}>Logged in as {user.username}</span>
        <Divider size={1} />
        <span className={styles.logout} onClick={logout}>
          Logout
        </span>
      </div>
    </div>
  );
};

const mapState = state => ({
  user: AuthSelectors.userPopulated(state)
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(AuthActions.logout())
});

export default connect(mapState, mapDispatch)(Header);
