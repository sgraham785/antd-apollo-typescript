import React, { PureComponent } from "react";
import numeral from "numeral";
import { connect } from "dva";
import {
  Row,
  Col,
  Form,
  Card,
  Select,
  Icon,
  Avatar,
  List,
  Tooltip,
  Dropdown,
  Menu
} from "antd";
import TagSelect from "../../components/TagSelect";
import StandardFormRow from "../../components/StandardFormRow";
import styles from "./Applications.css";

const { Option } = Select;
const FormItem = Form.Item;

const formatWan = val => {
  const v = val * 1;
  if (!v || isNaN(v)) return "";

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <em className={styles.wan}>万</em>
      </span>
    );
  }
  return result;
};

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
export default class FilterCardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: "list/fetch",
      payload: {
        count: 8
      }
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout Used to ensure that the value of the form is obtained when all form fields have been updated
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: "list/fetch",
            payload: {
              count: 8
            }
          });
        }
      });
    }, 0);
  };

  render() {
    const { list: { list }, loading, form } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>Active User</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>New User</p>
          <p>{newUser}</p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="Categories"
              block
              style={{ paddingBottom: 11 }}
            >
              <FormItem>
                {getFieldDecorator("category")(
                  <TagSelect onChange={this.handleFormSubmit} expandable>
                    <TagSelect.Option value="cat1">cat1</TagSelect.Option>
                    <TagSelect.Option value="cat2">cat3</TagSelect.Option>
                    <TagSelect.Option value="cat3">cat3</TagSelect.Option>
                    <TagSelect.Option value="cat4">cat4</TagSelect.Option>
                    <TagSelect.Option value="cat5">cat5</TagSelect.Option>
                    <TagSelect.Option value="cat6">cat6</TagSelect.Option>
                    <TagSelect.Option value="cat7">cat7</TagSelect.Option>
                    <TagSelect.Option value="cat8">cat8</TagSelect.Option>
                    <TagSelect.Option value="cat9">cat9</TagSelect.Option>
                    <TagSelect.Option value="cat10">cat10</TagSelect.Option>
                    <TagSelect.Option value="cat11">cat11</TagSelect.Option>
                    <TagSelect.Option value="cat12">cat12</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="Other options" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="Author">
                    {getFieldDecorator("author", {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="Select"
                        style={{ maxWidth: 200, width: "100%" }}
                      >
                        <Option value="lisa">Lisa</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="Rate">
                    {getFieldDecorator("rate", {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="Select"
                        style={{ maxWidth: 200, width: "100%" }}
                      >
                        <Option value="good">Good</Option>
                        <Option value="normal">Normal</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title="download">
                    <Icon type="download" />
                  </Tooltip>,
                  <Tooltip title="edit">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip title="share">
                    <Icon type="share-alt" />
                  </Tooltip>,
                  <Dropdown overlay={itemMenu}>
                    <Icon type="ellipsis" />
                  </Dropdown>
                ]}
              >
                <Card.Meta
                  avatar={<Avatar size="small" src={item.avatar} />}
                  title={item.title}
                />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    activeUser={formatWan(item.activeUser)}
                    newUser={numeral(item.newUser).format("0,0")}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
