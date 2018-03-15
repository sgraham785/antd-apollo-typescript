import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import {
  List,
  Card,
  Button,
  Progress,
  Radio,
  Input,
  Icon,
  Dropdown,
  Menu,
  Avatar
} from "antd";
import styles from "./Programs.css";
import { graphql } from "react-apollo";
import { ProgramsQuery } from '../../queries/queries'
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

class Programs extends PureComponent {
  render() {
    const {
      data: { loading, programs },
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50
    };

    const menu = (
      <Menu>
        <Menu.Item>
          <a>Edit</a>
        </Menu.Item>
        <Menu.Item>
          <a>Delete</a>
        </Menu.Item>
      </Menu>
    );

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            Mauris massa. Vestibulum lacinia arcu eget nulla.
        </p>
        <div className={styles.contentLink}>
          <a>
            <img
              alt=""
              src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            />
            Quick start
          </a>
          <a>
            <img
              alt=""
              src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            />
            Program introduction
          </a>
          <a>
            <img
              alt=""
              src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            />
            Program documentation
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="progress">In Progress</RadioButton>
          <RadioButton value="waiting">Waiting</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Search"
          onSearch={() => ({})}
        />
      </div>
    );

    const pageHeaderExtraContent = (
      <div className={styles.extraImg}>
        <img
          alt="This is a title"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Created At</span>
          <p>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress
            percent={percent}
            status={status}
            strokeWidth={6}
            style={{ width: 180 }}
          />
        </div>
      </div>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          More <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout
        title="Canary Programs list"
        content={content}
        extraContent={pageHeaderExtraContent}
      >

        <div className={styles.standardList}>
            <Card
                className={styles.listCard}
                bordered={false}
                title="Programs"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: "0 32px 40px 32px" }}
                extra={extraContent}
              >
                <Button
                  type="dashed"
                  style={{ width: "100%", marginBottom: 8 }}
                  icon="plus"
                >
                  Add Program
                </Button>
                    <List
                      size="large"
                      rowKey="id"
                      loading={loading}
                      pagination={paginationProps}
                      dataSource={programs}
                      renderItem={item => (
                        <List.Item actions={[<a>Edit</a>, <MoreBtn />]}>
                          <List.Item.Meta
                            avatar={
                              <Avatar src={item.logo} shape="square" size="large" />
                            }
                            title={<a href={item.logo}>{item.name}</a>}
                            description={item.description}
                          />
                          <ListContent data={item} />
                        </List.Item>
                      )}
                    />
            </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
export default connect(({ user, global, loading }) => ({
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices
}))(graphql(ProgramsQuery)(Programs));
