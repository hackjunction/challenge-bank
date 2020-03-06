import React, { useState } from "react";

import { Input, Button, notification } from "antd";

import useFormField from "hooks/useFormField";
import InputWrapper from "components/InputWrapper";
import Divider from "components/Divider";

import UsersService from "services/users";

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const username = useFormField("");
  const password = useFormField("");

  const handleSubmit = () => {
    setLoading(true);
    UsersService.login(username.value, password.value)
      .then(user => {
        onSuccess(user);
      })
      .catch(err => {
        if (err.response) {
          notification.error({
            message: "Login failed",
            description: err.response.data.message
          });
        } else {
          notification.error({
            message: "Login failed",
            description:
              "Something went wrong... Are you sure you're connected to the internet?"
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <InputWrapper label="Username">
        <Input {...username} placeholder="Username" size="large" />
      </InputWrapper>
      <Divider size={1} />
      <InputWrapper label="Password">
        <Input
          {...password}
          placeholder="Password (min. 8 characters)"
          size="large"
          type="password"
        />
      </InputWrapper>
      <Divider size={1} />
      <Button
        type="primary"
        size="large"
        loading={loading}
        block
        onClick={handleSubmit}
      >
        Log in
      </Button>
    </React.Fragment>
  );
};

export default LoginForm;
