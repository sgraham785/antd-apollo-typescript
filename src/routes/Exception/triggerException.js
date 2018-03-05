import React, { PureComponent } from "react";
import { Button, Spin, Card } from "antd";
import { connect } from "dva";
import styles from "./style.css";

@connect(state => ({
  isloading: state.error.isloading
}))
export default class TriggerException extends PureComponent {
  state = {
    isloading: false
  };
  trigger401 = () => {
    this.setState({
      isloading: true
    });
    this.props.dispatch({
      type: "error/query401"
    });
  };
  trigger403 = () => {
    this.setState({
      isloading: true
    });
    this.props.dispatch({
      type: "error/query403"
    });
  };
  trigger500 = () => {
    this.setState({
      isloading: true
    });
    this.props.dispatch({
      type: "error/query500"
    });
  };
  trigger404 = () => {
    this.setState({
      isloading: true
    });
    this.props.dispatch({
      type: "error/query404"
    });
  };
  render() {
    return (
      <Card>
        <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={this.trigger401}>
            trigger 401
          </Button>
          <Button type="danger" onClick={this.trigger403}>
            trigger 403
          </Button>
          <Button type="danger" onClick={this.trigger500}>
            trigger 500
          </Button>
          <Button type="danger" onClick={this.trigger404}>
            trigger 404
          </Button>
        </Spin>
      </Card>
    );
  }
}
