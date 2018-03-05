import React, { Component } from "react";
import { connect } from "dva";
import { Link } from "dva/router";
import { Checkbox, Alert, Icon } from "antd";
import Login from "ant-design-pro/lib/Login";
import styles from "./Login.css";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects["login/login"]
}))
export default class LoginPage extends Component {
  state = {
    type: "account",
    autoLogin: true
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: "login/login",
        payload: {
          ...values,
          type
        }
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  renderMessage = content => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="Account password login">
            {login.status === "error" &&
              login.type === "account" &&
              !login.submitting &&
              this.renderMessage("Wrong account or password（admin/888888）")}
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <Tab key="mobile" tab="Phone number login">
            {login.status === "error" &&
              login.type === "mobile" &&
              !login.submitting &&
              this.renderMessage("Verification code error")}
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab>
          <div>
            <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
            >
              auto login
            </Checkbox>
            <a style={{ float: "right" }} href="">
              forget password
            </a>
          </div>
          <Submit loading={submitting}>log in</Submit>
          <div className={styles.other}>
            Other login methods
            <Icon className={styles.icon} type="alipay-circle" />
            <Icon className={styles.icon} type="taobao-circle" />
            <Icon className={styles.icon} type="weibo-circle" />
            <Link className={styles.register} to="/user/register">
              Register
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}
