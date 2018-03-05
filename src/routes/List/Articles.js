import React, { Component, Fragment } from "react";
import moment from "moment";
import { connect } from "dva";
import {
  Form,
  Card,
  Select,
  List,
  Tag,
  Icon,
  Avatar,
  Row,
  Col,
  Button
} from "antd";
import TagSelect from "../../components/TagSelect";
import StandardFormRow from "../../components/StandardFormRow";
import styles from "./Articles.css";

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
export default class SearchList extends Component {
  componentDidMount() {
    this.fetchMore();
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ["wzj"]
    });
  };

  fetchMore = () => {
    this.props.dispatch({
      type: "list/appendFetch",
      payload: {
        count: pageSize
      }
    });
  };

  render() {
    const { form, list: { list }, loading } = this.props;
    const { getFieldDecorator } = form;

    const owners = [
      { id: "wzj", name: "I myself" },
      { id: "wjh", name: "Wu Jiahao" },
      { id: "zxx", name: "John Smith" },
      { id: "zly", name: "Zhao Liying" },
      { id: "ym", name: "Yao Ming" }
    ];
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({
      data: { content, updatedAt, avatar, owner, href }
    }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a>
          Posted on <a href={href}>{href}</a>
          <em>{moment(updatedAt).format("YYYY-MM-DD HH:mm")}</em>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 }
      }
    };

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            onClick={this.fetchMore}
            style={{ paddingLeft: 48, paddingRight: 48 }}
          >
            {loading ? (
              <span>
                <Icon type="loading" /> Loading...
              </span>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      ) : null;

    return (
      <Fragment>
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
            <StandardFormRow title="owner" grid>
              <Row>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator("owner", {
                      initialValue: ["wjh", "zxx"]
                    })(
                      <Select
                        mode="multiple"
                        style={{ maxWidth: 286, width: "100%" }}
                        placeholder="Select owner"
                      >
                        {owners.map(owner => (
                          <Option key={owner.id} value={owner.id}>
                            {owner.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                    <a className={styles.selfTrigger} onClick={this.setOwner}>
                      Look at mine
                    </a>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="Other options" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="Active Users">
                    {getFieldDecorator("user", {})(
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
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="Rate">
                    {getFieldDecorator("rate", {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="Select"
                        style={{ maxWidth: 200, width: "100%" }}
                      >
                        <Option value="good">Good</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: "8px 32px 32px 32px" }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>Ant Design</Tag>
                      <Tag>Design language</Tag>
                      <Tag>Ant gold clothes</Tag>
                    </span>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}
