import React, { PureComponent, Fragment } from "react";
import { Table, Button, Input, message, Popconfirm, Divider } from "antd";
import styles from "./style.css";

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      this.setState({
        data: nextProps.value
      });
    }
  }
  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // Save the original data when entering edit mode
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }
  newMember = () => {
    const newData = this.state.data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: "",
      name: "",
      department: "",
      editable: true,
      isNew: true
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e, key) {
    if (e.key === "Enter") {
      this.saveRow(e, key);
    }
  }
  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.workId || !target.name || !target.department) {
        message.error("Please fill in the full member information.");
        e.target.focus();
        this.setState({
          loading: false
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
      this.setState({
        loading: false
      });
    }, 500);
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, "name", record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Enter Name"
              />
            );
          }
          return text;
        }
      },
      {
        title: "Work Id",
        dataIndex: "workId",
        key: "workId",
        width: "20%",
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, "workId", record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Enter work Id"
              />
            );
          }
          return text;
        }
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
        width: "40%",
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e =>
                  this.handleFieldChange(e, "department", record.key)
                }
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Enter Department"
              />
            );
          }
          return text;
        }
      },
      {
        title: "Acion",
        key: "action",
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>Add</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Do you want to delete this?"
                    onConfirm={() => this.remove(record.key)}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>Delete</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>Cancel</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>Edit</a>
              <Divider type="vertical" />
              <Popconfirm
                title="Do you want to delete this?"
                onConfirm={() => this.remove(record.key)}
              >
                <a>Delete</a>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : "";
          }}
        />
        <Button
          style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          Add Members
        </Button>
      </Fragment>
    );
  }
}
