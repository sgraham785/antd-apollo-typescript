import React, { PureComponent } from "react";
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover
} from "antd";
import { connect } from "dva";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import FooterToolbar from "ant-design-pro/lib/FooterToolbar";
import TableForm from "./TableForm";
import styles from "./style.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: "warehouse name",
  url: "Warehouse Domain Name",
  owner: "warehouse manager",
  approver: "Approver",
  dateRange: "Effective Date",
  type: "warehouse type",
  name2: "task name",
  url2: "task description",
  owner2: "executor",
  approver2: "responsible person",
  dateRange2: "Effective Date",
  type2: "task type"
};

const tableData = [
  {
    key: "1",
    workId: "00001",
    name: "John Brown",
    department: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    workId: "00002",
    name: "Jim Green",
    department: "London No. 1 Lake Park"
  },
  {
    key: "3",
    workId: "00003",
    name: "Joe Black",
    department: "Sidney No. 1 Lake Park"
  }
];

class AdvancedForm extends PureComponent {
  state = {
    width: "100%"
  };
  componentDidMount() {
    window.addEventListener("resize", this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll(".ant-layout-sider")[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: "form/submitAdvancedForm",
            payload: values
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li
            key={key}
            className={styles.errorListItem}
            onClick={() => scrollToField(key)}
          >
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="Form verification information"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout
        title="Advanced form"
        content="Advanced forms are common in one-time input and submitting large quantities of data."
        wrapperClassName={styles.advancedForm}
      >
        <Card
          title="Warehouse management"
          className={styles.card}
          bordered={false}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter the name of the warehouse"
                      }
                    ]
                  })(
                    <Input placeholder="Please enter the name of the warehouse" />
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator("url", {
                    rules: [{ required: true, message: "please choose" }]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="please enter"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator("owner", {
                    rules: [
                      {
                        required: true,
                        message: "Please select administrator"
                      }
                    ]
                  })(
                    <Select placeholder="Please select administrator">
                      <Option value="xiao">Fu Xiao Xiao</Option>
                      <Option value="mao">Week fur</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator("approver", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the approver"
                      }
                    ]
                  })(
                    <Select placeholder="Please select the approver">
                      <Option value="xiao">Fu Xiao Xiao</Option>
                      <Option value="mao">Week fur</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator("dateRange", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the effective date"
                      }
                    ]
                  })(
                    <RangePicker
                      placeholder={["Start date", "end date"]}
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator("type", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a warehouse type"
                      }
                    ]
                  })(
                    <Select placeholder="Please select a warehouse type">
                      <Option value="private">Private</Option>
                      <Option value="public">Public</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Task management" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator("name2", {
                    rules: [{ required: true, message: "please enter" }]
                  })(<Input placeholder="please enter" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator("url2", {
                    rules: [{ required: true, message: "please choose" }]
                  })(<Input placeholder="please choose" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator("owner2", {
                    rules: [
                      {
                        required: true,
                        message: "Please select administrator"
                      }
                    ]
                  })(
                    <Select placeholder="Please select administrator">
                      <Option value="xiao">Fu Xiao Xiao</Option>
                      <Option value="mao">Week fur </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator("approver2", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the approver"
                      }
                    ]
                  })(
                    <Select placeholder="Please select the approver">
                      <Option value="xiao">Fu Xiao Xiao</Option>
                      <Option value="mao">Week fur </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator("dateRange2", {
                    rules: [{ required: true, message: "please enter" }]
                  })(
                    <TimePicker
                      placeholder="Reminder time"
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <Form.Item label={fieldLabels.type2}>
                  {getFieldDecorator("type2", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a warehouse type"
                      }
                    ]
                  })(
                    <Select placeholder="Please select a warehouse type">
                      <Option value="private">Private</Option>
                      <Option value="public">Public</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Member management" bordered={false}>
          {getFieldDecorator("members", {
            initialValue: tableData
          })(<TableForm />)}
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects["form/submitAdvancedForm"]
}))(Form.create()(AdvancedForm));
