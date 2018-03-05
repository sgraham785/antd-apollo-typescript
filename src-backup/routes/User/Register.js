import React, { Component } from "react";
import { connect } from "dva";
import { routerRedux, Link } from "dva/router";
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from "antd";
import styles from "./Register.less";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: <div className={styles.success}>Strength: strong</div>,
  pass: <div className={styles.warning}>Strength: medium</div>,
  poor: <div className={styles.error}>Strength: too short</div>
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects["register/submit"]
}))
@Form.create()
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86"
  };

  componentWillReceiveProps(nextProps) {
    const account = this.props.form.getFieldValue("mail");
    if (nextProps.register.status === "ok") {
      this.props.dispatch(
        routerRedux.push({
          pathname: "/user/register-result",
          state: {
            account
          }
        })
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "register/submit",
          payload: {
            ...values,
            prefix: this.state.prefix
          }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("The password does not match!");
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: "Please enter the password！",
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({
        help: ""
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback("error");
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix } = this.state;
    return (
      <div className={styles.main}>
        <h3>Register</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("mail", {
              rules: [
                {
                  required: true,
                  message: "Please input the email address！"
                },
                {
                  type: "email",
                  message: "E-mail address format error!"
                }
              ]
            })(<Input size="large" placeholder="e-mail" />)}
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: "4px 0" }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    Please enter at least 6 characters. Please do not use easily
                    guessed passwords.
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="At least 6 passwords, case sensitive"
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                placeholder="confirm password"
              />
            )}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{ width: "20%" }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator("mobile", {
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
              })(
                <Input
                  size="large"
                  style={{ width: "80%" }}
                  placeholder="phone"
                />
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("captcha", {
                  rules: [
                    {
                      required: true,
                      message: "please enter verification code!"
                    }
                  ]
                })(<Input size="large" placeholder="Verification code" />)}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : "get verification code"}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              register
            </Button>
            <Link className={styles.login} to="/user/login">
              Log in using your existing account
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
