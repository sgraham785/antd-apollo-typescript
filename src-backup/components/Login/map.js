import React from "react";
import { Input, Icon } from "antd";
import styles from "./index.less";

const map = {
  UserName: {
    component: Input,
    props: {
      size: "large",
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: "admin"
    },
    rules: [
      {
        required: true,
        message: "Please enter your username!"
      }
    ]
  },
  Password: {
    component: Input,
    props: {
      size: "large",
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: "password",
      placeholder: "888888"
    },
    rules: [
      {
        required: true,
        message: "Please enter the password!"
      }
    ]
  },
  Mobile: {
    component: Input,
    props: {
      size: "large",
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: "phone number"
    },
    rules: [
      {
        required: true,
        message: "Please enter phone number!"
      },
      {
        pattern: /^1\d{10}$/,
        message: "Malformed phone number!"
      }
    ]
  },
  Captcha: {
    component: Input,
    props: {
      size: "large",
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: "Verification code"
    },
    rules: [
      {
        required: true,
        message: "Please enter verification code!"
      }
    ]
  }
};

export default map;
