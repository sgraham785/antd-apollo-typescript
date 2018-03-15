import * as React from "react";
import { routerRedux, Route, Switch } from "dva/router";
import { LocaleProvider, Spin } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import dynamic from "dva/dynamic";
import { getRouterData } from "./common/router";
import Authorized from "./utils/Authorized";
import * as styles from "./index.css";
import ApolloClient  from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { link } from "./graphql/link";

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const AdminLayout = routerData["/admin"].component;
  const UserLayout = routerData["/user"].component;
  const BasicLayout = routerData["/"].component;
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  return (
    <ApolloProvider client={client}>
      <LocaleProvider locale={enUS}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/admin" component={AdminLayout} />
            <Route path="/user" component={UserLayout} />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              authority={["admin", "user"]}
              redirectPath="/user/login"
            />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    </ApolloProvider>
  );
}

export default RouterConfig;
