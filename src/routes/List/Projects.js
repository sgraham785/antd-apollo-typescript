import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import { Row, Col, Form, Card, Select, List } from "antd";
import TagSelect from "../../components/TagSelect";
import AvatarList from "ant-design-pro/lib/AvatarList";
import StandardFormRow from "../../components/StandardFormRow";
import styles from "./Projects.css";

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
export default class CoverCardList extends PureComponent {
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
    const { list: { list = [] }, loading, form } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} height={154} />}
            >
              <Card.Meta
                title={<a href="#">{item.title}</a>}
                description={item.subDescription}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${i}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="Category"
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
        <div className={styles.cardList}>{cardList}</div>
      </div>
    );
  }
}
