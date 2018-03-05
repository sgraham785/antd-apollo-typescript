import React, { Fragment } from "react";
import { Button, Row, Col, Icon, Steps, Card } from "antd";
import Result from "ant-design-pro/lib/Result";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const { Step } = Steps;

const desc1 = (
  <div
    style={{
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.45)",
      position: "relative",
      left: 42
    }}
  >
    <div style={{ margin: "8px 0 4px" }}>
      Qu Lili<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: "relative", left: 42 }}>
    <div style={{ margin: "8px 0 4px" }}>
      Week fur<Icon
        type="dingding-o"
        style={{ color: "#00A0E9", marginLeft: 8 }}
      />
    </div>
    <div>
      <a href="">Urging</a>
    </div>
  </div>
);

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: "rgba(0, 0, 0, 0.85)",
        fontWeight: "500",
        marginBottom: 20
      }}
    >
      Project Name
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: "rgba(0, 0, 0, 0.85)" }}>Project ID：</span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: "rgba(0, 0, 0, 0.85)" }}>principal:</span>
        Qu Lili
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span style={{ color: "rgba(0, 0, 0, 0.85)" }}>Effective time:</span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
    <Steps
      style={{ marginLeft: -42, width: "calc(100% + 84px)" }}
      progressDot
      current={1}
    >
      <Step
        title={<span style={{ fontSize: 14 }}>Create a project</span>}
        description={desc1}
      />
      <Step
        title={<span style={{ fontSize: 14 }}>Department</span>}
        description={desc2}
      />
      <Step title={<span style={{ fontSize: 14 }}>Review</span>} />
      <Step title={<span style={{ fontSize: 14 }}>Checkout</span>} />
    </Steps>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">Back to list</Button>
    <Button> View Item </Button>
    <Button> Print </Button>
  </Fragment>
);

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="success"
        title="Submit Success"
        description="submit results page is used to feed back the results of a series of operational tasks, If only a simple operation, you can use the Message global prompt feedback. This text area can show simple additions if there is a similar display Documents demand, the following gray area can present more complex content. "
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
