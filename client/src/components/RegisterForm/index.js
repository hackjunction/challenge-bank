import React, { useState } from "react";

import { Input, Button, notification } from "antd";
import useFormField from "hooks/useFormField";
import InputWrapper from "components/InputWrapper";
import Divider from "components/Divider";

import UsersService from "services/users";

const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const username = useFormField("", value => {
    if (!value || !value.length) {
      return "Username is required";
    } else if (value.length < 3) {
      return "Username must be at least 3 characters";
    } else if (value.length > 50) {
      return "Username can't be more than 50 characters";
    }

    return;
  });
  const password = useFormField("", value => {
    if (!value || !value.length) {
      return "Password is required! Obviously...";
    } else if (value.length < 8) {
      return "Password must be at least 8 characters";
    } else if (value.length > 100) {
      return "Password can't be more than 100 characters";
    }
    return;
  });
  const password2 = useFormField("", value => {
    if (!value || !value.length) {
      return "Please confirm your password";
    } else if (value !== password.value) {
      return "The passwords don't match";
    }
    return;
  });
  const secretCode = useFormField("", value => {
    if (!value || !value.length) {
      return "Event code is required";
    }

    return;
  });

  const validate = () => {
    let hasError = false;
    const usernameError = username.validate(username.value);
    if (usernameError) {
      username.setError(usernameError);
      hasError = true;
    }

    const passwordError = password.validate(password.value);
    if (passwordError) {
      password.setError(passwordError);
      hasError = true;
    }

    const password2Error = password2.validate(password2.value);
    if (password2Error) {
      password2.setError(password2Error);
      hasError = true;
    }

    const secretCodeError = secretCode.validate(secretCode.value);
    if (secretCodeError) {
      secretCode.setError(secretCodeError);
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
    } else {
      return;
    }
    UsersService.register(username.value, password.value, secretCode.value)
      .then(user => {
        onSuccess(user);
      })
      .catch(err => {
        if (err.response) {
          notification.error({
            message: "Signup failed",
            description: err.response.data.message
          });
        } else {
          notification.error({
            message: "Signup failed",
            description:
              "Something wen't wrong... Are you connected to the internet?"
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <InputWrapper label="Username" error={username.error}>
        <Input
          {...username}
          type="text"
          placeholder="Your awesome username"
          size="large"
        />
      </InputWrapper>
      <InputWrapper label="Password" error={password.error}>
        <Input
          {...password}
          type="password"
          placeholder="Something super secret"
          size="large"
        />
      </InputWrapper>
      <InputWrapper label="Confirm password" error={password2.error}>
        <Input
          {...password2}
          type="password"
          placeholder="The same super secret thing"
          size="large"
        />
      </InputWrapper>
      <InputWrapper label="Event code" error={secretCode.error}>
        <Input
          {...secretCode}
          type="text"
          placeholder="The code for your event"
          size="large"
        />
      </InputWrapper>
      <Divider size={1} />
      <Button
        type="primary"
        size="large"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Create account
      </Button>
    </React.Fragment>
  );
};

export default RegisterForm;
