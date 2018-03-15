import React, { Fragment } from "react";
import * as PropTypes from "prop-types";
import { Redirect, Switch, Route, routerRedux } from "dva/router";
import { Layout, Icon, message } from "antd";
import DocumentTitle from "react-document-title";
import logo from "../assets/canary_logo.png";
import { connect } from "dva";
import { ContainerQuery } from "react-container-query";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "ant-design-pro/lib/GlobalFooter";
import * as classNames from "classnames";
import { enquireScreen } from "enquire-js";
import NotFound from "../routes/Exception/404";
import { getRoutes } from "../utils/utils";
import Authorized from "../utils/Authorized";
import { getMenuData } from "../common/menu";
import SiderMenu from "../components/SiderMenu";

import { graphql } from "react-apollo";
import { PostsQuery } from '../queries/queries'

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute } = Authorized;

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 Canary Health
  </Fragment>
);

/**
 * Get the redirection address according to the menu.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class AdminLayout extends React.PureComponent {

  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  state = {
    isMobile
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData
    };
  }
  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile
      });
    });
    this.props.dispatch({
      type: "user/fetchCurrent"
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = "Canary Health Admin";
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Canary Health`;
    }
    return title;
  }
  getBashRedirect = () => {
    // Redirect sccording to the url parameter redirect
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get("redirect");
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete("redirect");
      window.history.replaceState(null, "redirect", urlParams.href);
    } else {
      return "/admin/analysis";
    }
    return redirect;
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };
  handleNoticeClear = type => {
    message.success(`Cleared ${type}`);
    this.props.dispatch({
      type: "global/clearNotices",
      payload: type
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === "triggerError") {
      this.props.dispatch(routerRedux.push("/exception/trigger"));
      return;
    }
    if (key === "logout") {
      this.props.dispatch({
        type: "login/logout"
      });
    }
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: "global/fetchNotices"
      });
    }
  };
  render() {
    console.log('Admin Layout')
    console.log('props ')
    console.log(this.props)
    const {
      currentUser,
      fetchingNotices,
      notices,
      collapsed,
      routerData,
      match,
      location,
      data: { loading, posts },
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: "24px 24px 0", height: "100%" }}>
            <Switch>
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                />
              ))}
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018 Canary Health
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices
}))(graphql(PostsQuery)(AdminLayout));