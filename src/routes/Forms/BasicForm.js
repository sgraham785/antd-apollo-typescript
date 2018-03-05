import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "./style.css";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects["form/submitRegularForm"]
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "form/submitRegularForm",
          payload: values
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };

    return (
      <PageHeaderLayout
        title="Basic form"
        content="Form pages are used to collect or verify information from users. Basic forms are common to form scenes with fewer data items."
      >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout} label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the title"
                  }
                ]
              })(<Input placeholder="Enter title" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Date Range">
              {getFieldDecorator("date", {
                rules: [
                  {
                    required: true,
                    message: "Please select dates"
                  }
                ]
              })(
                <RangePicker
                  style={{ width: "100%" }}
                  placeholder={["Start Date", "End Date"]}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Goal">
              {getFieldDecorator("goal", {
                rules: [
                  {
                    required: true,
                    message: "Please Enter Goal"
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Write your goal..."
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Standard">
              {getFieldDecorator("standard", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a measure"
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Please enter a measure"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Client
                  <em className={styles.optional}>
                    (Optional)
                    <Tooltip title="Goal of the service object">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator("client")(
                <Input placeholder="Please describe your customer service, internal customers directly @ name / job number" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Invited commentators<em className={styles.optional}>
                    (Optional)
                  </em>
                </span>
              }
            >
              {getFieldDecorator("invites")(
                <Input placeholder="Please direct @ name / job number, up to 5 people can be invited" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Weights<em className={styles.optional}>(Optional)</em>
                </span>
              }
            >
              {getFieldDecorator("weight")(
                <InputNumber placeholder="Please enter" min={0} max={100} />
              )}
              <span>%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="target public"
              help="customers, invited commentators are shared by default"
            >
              <div>
                {getFieldDecorator("public", {
                  initialValue: "1"
                })(
                  <Radio.Group>
                    <Radio value="1"> Public </Radio>
                    <Radio value="2"> Partially public </Radio>
                    <Radio value="3"> Not public </Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator("publicUsers")(
                    <Select
                      mode="multiple"
                      placeholder="Open to"
                      style={{
                        margin: "8px 0",
                        display:
                          getFieldValue("public") === "2" ? "block" : "none"
                      }}
                    >
                      <Option value="1"> Colleague A </Option>
                      <Option value="2"> Colleague B </Option>
                      <Option value="3"> Colleague C </Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Submit
              </Button>
              <Button style={{ marginLeft: 8 }}>Save</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
