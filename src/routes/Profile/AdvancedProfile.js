import React, { Component, Fragment } from "react";
import Debounce from "lodash-decorators/debounce";
import Bind from "lodash-decorators/bind";
import classNames from "classnames";
import { connect } from "dva";
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider
} from "antd";
import DescriptionList from "ant-design-pro/lib/DescriptionList";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "./AdvancedProfile.css";

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
    <Menu.Item key="3">Option 3</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>Operation</Button>
      <Button>Operation</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">Main Operation</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Status</div>
      <div className={styles.heading}>Pending</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Order Amount</div>
      <div className={styles.heading}>$568.08</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Creator">John Smith</Description>
    <Description term="Ordered Product">XX Service</Description>
    <Description term="Created At">2017-07-07</Description>
    <Description term="Related Orders">
      <a href="">12421</a>
    </Description>
    <Description term="Effective Dates">2017-07-07 ~ 2017-08-08</Description>
    <Description term="Remarks">
      Please confirm within two working days
    </Description>
  </DescriptionList>
);

const tabList = [
  {
    key: "detail",
    tab: "Details"
  },
  {
    key: "rule",
    tab: "Rules"
  }
];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      John Smith
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      Week Fur
      <Icon type="dingding-o" style={{ color: "#00A0E9", marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">Urgent</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    Wu Plus
    <span className={styles.textSecondary} style={{ float: "right" }}>
      <Badge
        status="default"
        text={<span style={{ color: "rgba(0, 0, 0, 0.45)" }}>No Response</span>}
      />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      Time Spent: 2 hours 25 minutes
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === "process" ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

const operationTabList = [
  {
    key: "tab1",
    tab: "Operation log 1"
  },
  {
    key: "tab2",
    tab: "Operation log 2"
  },
  {
    key: "tab3",
    tab: "Operation log 3"
  }
];

const columns = [
  {
    title: "Type of operation",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "Operation Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Operation Status",
    dataIndex: "status",
    key: "status",
    render: text =>
      text === "agree" ? (
        <Badge status="success" text="Success" />
      ) : (
        <Badge status="error" text="Error" />
      )
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt"
  },
  {
    title: "Remarks",
    dataIndex: "memo",
    key: "memo"
  }
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects["profile/fetchAdvanced"]
}))
export default class AdvancedProfile extends Component {
  state = {
    operationkey: "tab1",
    stepDirection: "horizontal"
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "profile/fetchAdvanced"
    });

    this.setStepDirection();
    window.addEventListener("resize", this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== "vertical" && w <= 576) {
      this.setState({
        stepDirection: "vertical"
      });
    } else if (stepDirection !== "horizontal" && w > 576) {
      this.setState({
        stepDirection: "horizontal"
      });
    }
  }

  render() {
    const { stepDirection } = this.state;
    const { profile, loading } = this.props;
    const {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3
    } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      )
    };

    return (
      <PageHeaderLayout
        title="Number：234231029431"
        logo={
          <img
            alt=""
            src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
          />
        }
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card
          title="Process progress"
          style={{ marginBottom: 24 }}
          bordered={false}
        >
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="Create a project" description={desc1} />
            <Step title="Department of first instance" description={desc2} />
            <Step title="Financial review" />
            <Step title="Check out" />
          </Steps>
        </Card>
        <Card
          title="User Information"
          style={{ marginBottom: 24 }}
          bordered={false}
        >
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="user name"> pay small </Description>
            <Description term="Membership Card Number">
              32943898021309809423
            </Description>
            <Description term="ID"> 3321944288191034921 </Description>
            <Description term="Contact"> 18112345678 </Description>
            <Description term="Contact Address">
              John Smith 18100000000 Jixue Road, Huanghu Mountain Road, Xihu
              District, Hangzhou, Zhejiang, China
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="Fields">
            <Description term="A certain data"> 725 </Description>
            <Description term="This data update time"> 2017-08-08 </Description>
            <Description> & nbsp; </Description>
            <Description
              term={
                <span>
                  A certain data
                  <Tooltip title="Data Description">
                    <Icon
                      style={{ color: "rgba (0, 0, 0, 0.43)", marginLeft: 4 }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="This data update time"> 2017-08-08 </Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}> info group </h4>
          <Card type="inner" title="multi-level information group">
            <DescriptionList
              size="small"
              style={{ marginBottom: 16 }}
              title="group name"
            >
              <Description term="Owner"> Lin Dongdong </Description>
              <Description term="Character Code"> 1234567 </Description>
              <Description term="Departments">
                XX Company - YY Department
              </Description>
              <Description term="Expiration time"> 2017-08-08 </Description>
              <Description term="Description">
                Long, long, long, long, long, long, long, long, very long, very
                long and long ...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: "16px 0" }} />
            <DescriptionList
              size="small"
              style={{ marginBottom: 16 }}
              title="group name"
              col="1"
            >
              <Description term="scientific name">
                Citrullus lanatus (Thunb.) Matsum. Et Nakai annual vine vine;
                stems, branches thick, with obvious edges. Thick tendrils.
              </Description>
            </DescriptionList>
            <Divider style={{ margin: "16px 0" }} />
            <DescriptionList size="small" title="Group Name">
              <Description term="person in charge"> pay small </Description>
              <Description term="Character Code"> 1234568 </Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card
          title="user nearly six years call records"
          style={{ marginBottom: 24 }}
          bordered={false}
        >
          <div className={styles.noData}>
            <Icon type="frown-o" /> No data
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}
