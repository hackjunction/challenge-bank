import React, { useEffect } from "react";
import styles from "./HomePage.module.scss";

import { Input, Tabs, Button } from "antd";
import { connect } from "react-redux";
import Divider from "components/Divider";
import InputWrapper from "components/InputWrapper";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";

import * as AuthSelectors from "redux/auth/selectors";
import * as AuthActions from "redux/auth/actions";
import { push } from "connected-react-router";

const HomePage = ({ isLoggedIn, login, pushChallengesPage }) => {
  useEffect(() => {
    if (isLoggedIn) {
      pushChallengesPage();
    }
  }, [isLoggedIn]);

  const handleLogin = user => {
    login(user);
  };

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.coverImage}
        src={require("assets/coverimage.jpg")}
      />
      <div className={styles.content}>
        <img className={styles.logo} src={require("assets/logo_white.png")} />
        <div className={styles.loginForm}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Log in" key="1">
              <LoginForm onSuccess={handleLogin} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Register" key="2">
              <RegisterForm onSuccess={handleLogin} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  isLoggedIn: AuthSelectors.isLoggedIn(state)
});

const mapDispatch = dispatch => ({
  login: user => dispatch(AuthActions.login(user)),
  pushChallengesPage: () => dispatch(push("/challenges"))
});

export default connect(mapState, mapDispatch)(HomePage);
