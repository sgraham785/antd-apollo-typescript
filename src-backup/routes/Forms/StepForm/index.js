import React, { PureComponent, Fragment } from "react";
import { Route, Redirect, Switch } from "dva/router";
import { Card, Steps } from "antd";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";
import NotFound from "../../Exception/404";
import { getRoutes } from "../../../utils/utils";
import styles from "../style.less";

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split("/");
    switch (pathList[pathList.length - 1]) {
      case "info":
        return 0;
      case "confirm":
        return 1;
      case "result":
        return 2;
      default:
        return 0;
    }
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <PageHeaderLayout
        title="Step by step form
"
        content="Divide a lengthy or unfamiliar form task into steps to guide the user through."
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="Fill in the transfer information" />
              <Step title="Confirm transfer information" />
              <Step title="Carry out" />
            </Steps>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect
                exact
                from="/form/step-form"
                to="/form/step-form/info"
              />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}
