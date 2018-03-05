import React, { PureComponent } from "react";
import { connect } from "dva";
import { Card, Button, Icon, List } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "./CardList.css";

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: "list/fetch",
      payload: {
        count: 8
      }
    });
  }

  render() {
    const { list: { list }, loading } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          Paragraphs indicate: ant gold service design platform ant.design, with
          minimal workload, seamless access to ant gold service ecology, Provide
          experience solutions that span design and development.
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
            Product introduction
          </a>
          <a>
            <img
              alt=""
              src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            />
            Product documentation
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="This is a title"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );

    return (
      <PageHeaderLayout
        title="Card list"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={["", ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[<a>Operation 1</a>, <a>Operation 2</a>]}
                  >
                    <Card.Meta
                      avatar={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.avatar}
                        />
                      }
                      title={<a href="#">{item.title}</a>}
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
    );
  }
}
