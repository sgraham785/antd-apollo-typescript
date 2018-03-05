import "@babel/polyfill";
import "url-polyfill";
import dva from "dva";

// import createHistory from 'history/createHashHistory';
// user BrowserHistory
import createHistory from "history/createBrowserHistory";
import createLoading from "dva-loading";
// import "moment/locale/zh-cn";
import FastClick from "fastclick";
// import "./rollbar";
// import registerServiceWorker from "./registerServiceWorker";
import "antd/dist/antd.min.css";
import "ant-design-pro/dist/ant-design-pro.min.css";
import "./index.css";

import FetchMock from "react-fetch-mock";

// global setting
window.fetch = new FetchMock(require("./__mocks__")).fetch;

// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require("./models/global").default);

// 4. Router
app.router(require("./router").default);

// app.use(registerServiceWorker());

// 5. Start
app.start("#root");

FastClick.attach(document.body);

export default app._store; // eslint-disable-line
