import React, { Fragment } from "react";
import { connect } from "dva";
import { Button, Row, Col } from "antd";
import { routerRedux } from "dva/router";
import Result from "ant-design-pro/lib/Result";
import styles from "./style.css";

class Step3 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push("/form/step-form"));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            Payment account:
          </Col>
          <Col span={16}>{data.payAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            Accounts receivable:
          </Col>
          <Col span={16}>{data.receiverAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            Payee Name:
          </Col>
          <Col span={16}>{data.receiverName}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            Transfer amount:
          </Col>
          <Col span={16}>
            <span className={styles.money}>{data.amount}</span> yuan
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          Re-turn
        </Button>
        <Button>Check the bill</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Successful operation"
        description="Expected to arrive within two hours"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.step
}))(Step3);
