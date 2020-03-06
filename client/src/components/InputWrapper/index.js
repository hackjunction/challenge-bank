import React from "react";
import styles from "./InputWrapper.module.scss";

const InputWrapper = ({ label, error, children }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {children}
      <small className={styles.error}>{error}</small>
    </div>
  );
};

export default InputWrapper;
