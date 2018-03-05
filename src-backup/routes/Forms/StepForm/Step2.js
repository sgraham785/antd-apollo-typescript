import React from "react";
import { connect } from "dva";
import { Form, Input, Button, Alert, Divider } from "antd";
import { routerRedux } from "dva/router";
import { digitUppercase } from "../../../utils/utils";
import styles from "./style.less";

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push("/form/step-form"));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: "form/submitStepForm",
            payload: {
              ...data,
              ...values
            }
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="Confirm the transfer, the funds will be directly into the other account, can not be returned."
          style={{ marginBottom: 24 }}
        />
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="payment account"
        >
          {data.payAccount}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="Accounts receivable"
        >
          {data.receiverAccount}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="Payee Name"
        >
          {data.receiverName}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="transfer amount"
        >
          <span className={styles.money}>{data.amount}</span>
          <span className={styles.uppercase}>
            （{digitUppercase(data.amount)}）
          </span>
        </Form.Item>
        <Divider style={{ margin: "24px 0" }} />
        <Form.Item
          {...formItemLayout}
          label="Pay the password"
          required={false}
        >
          {getFieldDecorator("password", {
            initialValue: "123456",
            rules: [
              {
                required: true,
                message: "You need to pay for the password to pay"
              }
            ]
          })(
            <Input
              type="password"
              autoComplete="off"
              style={{ width: "80%" }}
            />
          )}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span
            }
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            submit
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            Previous
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects["form/submitStepForm"],
  data: form.step
}))(Step2);
