import React, { Fragment } from "react";
import { connect } from "dva";
import { Form, Input, Button, Select, Divider } from "antd";
import { routerRedux } from "dva/router";
import styles from "./style.less";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: "form/saveStepFormData",
            payload: values
          });
          dispatch(routerRedux.push("/form/step-form/confirm"));
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="payment account
">
            {getFieldDecorator("payAccount", {
              initialValue: data.payAccount,
              rules: [
                {
                  required: true,
                  message: "Please select a payment account"
                }
              ]
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">
                  ant-design@alipay.com
                </Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Please choose payment receipt account"
          >
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">Alipay</Option>
                <Option value="bank">Bank Account</Option>
              </Select>
              {getFieldDecorator("receiverAccount", {
                initialValue: data.receiverAccount,
                rules: [
                  {
                    required: true,
                    message: "Please enter the payee account"
                  },
                  {
                    type: "email",
                    message: "The account name should be in email format"
                  }
                ]
              })(
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  placeholder="test@example.com"
                />
              )}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Payee Name">
            {getFieldDecorator("receiverName", {
              initialValue: data.receiverName,
              rules: [
                { required: true, message: "Please enter the payee name" }
              ]
            })(<Input placeholder="Please enter the payee name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="transfer amount
">
            {getFieldDecorator("amount", {
              initialValue: data.amount,
              rules: [
                {
                  required: true,
                  message: "Please enter the transfer amount"
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: "Please enter the legal amount of figures"
                }
              ]
            })(<Input prefix="$" placeholder="Please enter the amount" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span
              }
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              Next step
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: "40px 0 24px" }} />
        <div className={styles.desc}>
          <h3>Description</h3>
          <h4> Transfer to Alipay Account </h4>
          <p>
            If necessary, here can be put on some common product descriptions.
            If necessary, here can be put on some common product descriptions.
            If necessary, here can be put on some common product descriptions.
          </p>
          <h4> Transfer to Bank Card </h4>
          <p>
            If necessary, here can be put on some common product descriptions.
            If necessary, here can be put on some common product descriptions.
            If necessary, here can be put on some common product descriptions.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ form }) => ({
  data: form.step
}))(Step1);
