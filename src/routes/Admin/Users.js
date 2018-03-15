import React, { Component } from "react";
import { connect } from "dva";
import { Card, List, Icon, Button } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { getTimeDistance } from "../../utils/utils";
import { graphql } from "react-apollo";
import { UsersQuery } from '../../queries/queries'

import styles from "./Users.css";

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `Road workers ${i} Shop No.`,
    total: 323234
  });
}

class Users extends Component {
  state = {
    salesType: "all",
    currentTabKey: "",
    rangePickerValue: getTimeDistance("year")
  };

  componentDidMount() {
    this.props.dispatch({
      type: "chart/fetch"
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "chart/clear"
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue
    });

    this.props.dispatch({
      type: "chart/fetchSalesData"
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type)
    });

    this.props.dispatch({
      type: "chart/fetchSalesData"
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], "day") &&
      rangePickerValue[1].isSame(value[1], "day")
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const {
      data: { loading, users },
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            Mauris massa. Vestibulum lacinia arcu eget nulla.
        </p>
      </div>
    );

    const pageHeaderExtraContent = (
      <div className={styles.extraImg}>
        <img
          alt="This is a title"
          src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
        />
      </div>
    );

    const cardList = users && users.length > 0 ? (
      <PageHeaderLayout
        title="Users"
        content={content}
        extraContent={pageHeaderExtraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={users}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[<a>Info</a>, <a>Details</a>]}
                  >
                    <Card.Meta
                      avatar={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.avatar}
                        />
                      }
                      title={<a href="#">{item.firstName}</a>}
                      tooltip={item.firstName}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> Add product
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>

    ) : null;

    return (
      <div>
        {loading ? (
            <p>Loading…</p>
          ) : (
              <div className={styles.cardList}>{cardList}</div>
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
}))(graphql(UsersQuery)(Users));
