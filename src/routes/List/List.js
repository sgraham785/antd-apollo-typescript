import React, { Component } from "react";
import { routerRedux, Route, Switch } from "dva/router";
import { connect } from "dva";
import { Input } from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { getRoutes } from "../../utils/utils";

@connect()
export default class SearchList extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case "articles":
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case "applications":
        dispatch(routerRedux.push(`${match.url}/applications`));
        break;
      case "projects":
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      { key: "articles", tab: "articles" },
      { key: "applications", tab: "applications" },
      { key: "projects", tab: "projects" }
    ];

    const mainSearch = (
      <div style={{ textAlign: "center" }}>
        <Input.Search
          placeholder="Enter search"
          enterButton="Search"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="Search List"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, "")}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
