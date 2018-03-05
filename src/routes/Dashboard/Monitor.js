import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import { Row, Col, Card, Tooltip } from "antd";
import numeral from "numeral";
import Authorized from "../../utils/Authorized";
import { Pie, WaterWave, Gauge, TagCloud } from "ant-design-pro/lib/Charts";
import NumberInfo from "ant-design-pro/lib/NumberInfo";
import CountDown from "ant-design-pro/lib/CountDown";
import ActiveChart from "../../components/ActiveChart";
import styles from "./Monitor.css";

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: "monitor/fetchTags"
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col
            xl={18}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ marginBottom: 24 }}
          >
            <Card title="Real-time Trading Activity" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="Today's Total Deal"
                    suffix="yuan"
                    total={numeral(124543233).format("0,0")}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="Sales target completion rate"
                    total="92%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="Remaining Time"
                    total={<CountDown target={targetTime} />}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="Total transactions per second"
                    suffix="yuan"
                    total={numeral(234).format("0,0")}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="Waiting for later implementation">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="activity forecast"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="coupon efficiency"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: "center" }}
              bordered={false}
            >
              <Gauge
                format={val => {
                  switch (parseInt(val, 10)) {
                    case 20:
                      return "difference";
                    case 40:
                      return "in";
                    case 60:
                      return "good";
                    case 80:
                      return "excellent";
                    default:
                      return "";
                  }
                }}
                title="bounce rate"
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24}>
            <Card
              title="the proportion of each category"
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: "16px 0" }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="Chinese Fast Food"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="# 5DDECF"
                    percent={22}
                    subTitle="Western food"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="# 2FC25B"
                    percent={32}
                    subTitle="Hotpot"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="Top Search"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: "hidden" }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>

          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="resource surplus"
              bodyStyle={{ textAlign: "center", fontSize: 0 }}
              bordered={false}
            >
              <WaterWave
                height={161}
                title="Remaining funds surplus"
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
