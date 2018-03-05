import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from "antd";
import StandardTable from "../../components/StandardTable";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./TableList.css";

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(",");
const statusMap = ["default", "processing", "success", "error"];
const status = ["Closed", "running", "online", "abnormal"];
const columns = [
  {
    title: "No.",
    dataIndex: "no"
  },
  {
    title: "Description",
    dataIndex: "description"
  },
  {
    title: "Service Calls",
    dataIndex: "callNo",
    sorter: true,
    align: "right",
    render: val => `$ {val} million`, // mark to display a total number
    needTotal: true
  },
  {
    title: "status",
    dataIndex: "status",
    filters: [
      {
        text: status[0],
        value: 0
      },
      {
        text: status[1],
        value: 1
      },
      {
        text: status[2],
        value: 2
      },
      {
        text: status[3],
        value: 3
      }
    ],
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    }
  },
  {
    title: "Update Time",
    dataIndex: "updatedAt",
    sorter: true,
    render: val => <span> {moment(val).format("YYYY-MM-DD HH: mm: ss")} </span>
  },
  {
    title: "Operation",
    render: () => (
      <Fragment>
                <a href=""> Configure </a>
                <Divider type="vertical" />
                <a href=""> Subscribe to alerts </a>
      </Fragment>
    )
  }
];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="New Rule"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Description"
      >
        {form.getFieldDecorator("desc", {
          rules: [
            { required: true, message: "Please input some description..." }
          ]
        })(<Input placeholder="Enter description" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "rule/fetch"
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: "rule/fetch",
      payload: params
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "rule/fetch",
      payload: {}
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case "remove":
        dispatch({
          type: "rule/remove",
          payload: {
            no: selectedRows.map(row => row.no).join(",")
          },
          callback: () => {
            this.setState({
              selectedRows: []
            });
          }
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: "rule/fetch",
        payload: values
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: "rule/add",
      payload: {
        description: fields.desc
      }
    });

    message.success("Added successfully");
    this.setState({
      modalVisible: false
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="No.">
              {getFieldDecorator("no")(<Input placeholder="No." />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator("status")(
                <Select placeholder="Select" style={{ width: "100%" }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Query
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                Expand <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="No.">
              {getFieldDecorator("no")(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator("status")(
                <Select placeholder="Select" style={{ width: "100%" }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Number">
              {getFieldDecorator("number")(
                <InputNumber style={{ width: "100%" }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Date">
              {getFieldDecorator("date")(
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select date"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator("status3")(
                <Select placeholder="Select" style={{ width: "100%" }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator("status4")(
                <Select placeholder="Select" style={{ width: "100%" }}>
                  <Option value="0">Closed</Option>
                  <Option value="1">Running</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: "hidden" }}>
          <span style={{ float: "right", marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Reset
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              Collapse <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm
      ? this.renderAdvancedForm()
      : this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="approval">Batch approval</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible
    };

    return (
      <PageHeaderLayout title="Query Form">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible(true)}
              >
                New
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button> Batch </Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      More operations <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
