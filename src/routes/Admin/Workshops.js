import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import { Card } from "antd";
import { graphql } from "react-apollo";
import { WorkshopsQuery } from '../../queries/queries'
import {
  List,
  Tag,
  Icon,
  Button
} from "antd";

import styles from "./Workshops.css";

class Workshops extends PureComponent {
  render() {
    const {
      data: { loading, workshops },
    } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const loadMore = workshops && workshops.length > 0 ? (
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
     <div>
        {loading ? (
            <p>Loading…</p>
          ) : (
            <Fragment>
              <Card
                style={{ marginTop: 24 }}
                bordered={false}
                bodyStyle={{ padding: "8px 32px 32px 32px" }}
              >
                <List
                  size="large"
                  loading={workshops.length === 0 ? loading : false}
                  rowKey="id"
                  itemLayout="vertical"
                  loadMore={loadMore}
                  dataSource={workshops}
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
                          <a className={styles.listItemMetaTitle} href={item.name}>
                            {item.name}
                          </a>
                        }
                        description={
                          <span>
                            <Tag>{item.name}</Tag>
                          </span>
                        }
                      />
                      <p>{item.description}</p>
                    </List.Item>
                  )}
                />
              </Card>
            </Fragment>
          )}
      </div>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  //currentUser: user.currentUser,
  //collapsed: global.collapsed,
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices
}))(graphql(WorkshopsQuery)(Workshops));
