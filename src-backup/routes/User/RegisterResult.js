import React from "react";
import { Button } from "antd";
import { Link } from "dva/router";
import Result from "../../components/Result";
import styles from "./RegisterResult.less";

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        Check your email
      </Button>
    </a>
    <Link to="/">
      <Button size="large">Return to home page</Button>
    </Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        Your account：{location.state
          ? location.state.account
          : "AntDesign@example.com"}{" "}
        registration success
      </div>
    }
    description="The activation email has been sent to your email, the email is valid for 24 hours. Please log in to the mailbox in time, click the link in the email to activate the account."
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
