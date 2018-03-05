import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import { Link } from "dva/router";
import { Row, Col, Card, List, Avatar } from "antd";
import { Radar } from "ant-design-pro/lib/Charts";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import EditableLinkGroup from "../../components/EditableLinkGroup";

import styles from "./Workplace.css";

const links = [
  {
    title: "operation one",
    href: ""
  },
  {
    title: "operation two",
    href: ""
  },
  {
    title: "Operation Three",
    href: ""
  },
  {
    title: "operation four",
    href: ""
  },
  {
    title: "operation five",
    href: ""
  },
  {
    title: "operation six",
    href: ""
  }
];

const members = [
  {
    id: "members-1",
    title: "science move bricks group",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    link: ""
  },
  {
    id: "members-2",
    title: "programmer daily",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
    link: ""
  },
  {
    id: "members-3",
    title: "design day group",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
    link: ""
  },
  {
    id: "members-4",
    title: "Second Girls League",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
    link: ""
  },
  {
    id: "members-5",
    title: "Lying You to Learn Computer",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
    link: ""
  }
];

@connect(({ project, activities, chart, loading }) => ({
  project,
  activities,
  chart,
  projectLoading: loading.effects["project/fetchNotice"],
  activitiesLoading: loading.effects["activities/fetchList"]
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "project/fetchNotice"
    });
    dispatch({
      type: "activities/fetchList"
    });
    dispatch({
      type: "chart/fetch"
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "chart/clear"
    });
  }

  renderActivities() {
    const { activities: { list } } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: { notice },
      projectLoading,
      activitiesLoading,
      chart: { radarData }
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            Good morning, Qu Lili, I wish you happy every day!
          </div>
          <div>
            Interactive experts | ant gold clothes - a certain business group -
            a certain platform department - a certain technical department-UED
          </div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>Number of items</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>Ranking within the team</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>Project visit</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="Project in progress"
              bordered={false}
              extra={<Link to="/">All items</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ""}</Link>
                      {item.updatedAt && (
                        <span
                          className={styles.datetime}
                          title={item.updatedAt}
                        >
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="dynamic"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                  {this.renderActivities()}
                </div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="Quick start / easy navigation"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX index"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="team"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {members.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.link}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.title}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
