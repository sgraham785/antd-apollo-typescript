import Mock from "react-fetch-mock";
import { getRule, postRule } from "./rule";
import { getActivities, getNotice, getFakeList } from "./api";
import { getFakeChartData } from "./chart";
// import { imgMap } from "./utils";
import { getProfileBasicData } from "./profile";
import { getProfileAdvancedData } from "./profile";
import { getNotices } from "./notices";

export default {
  // Support Object and Array
  "GET /api/currentUser": () => {
    console.log("GET /api/currentUser --> got here");
    return {
      name: "Serati Ma",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png",
      userid: "00000001",
      notifyCount: 12
    };
  },
  // GET POST can be omitted
  "GET /api/users": () => {
    return [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      }
    ];
  },
  "GET /api/project/notice": () => getNotice,
  "GET /api/activities": () => getActivities,
  "GET /api/rule": getRule,
  "POST /api/rule": obj => {
    return postRule({
      ...obj,
      urlparams: {
        pageSize: {
          desc: "tab",
          exp: 2
        }
      }
    });
  },
  "POST /api/forms": () => {
    return {};
  },
  "GET /api/tags": () => {
    return Mock.mock({
      "list|100": [{ name: "@city", "value|1-100": 150, "type|0-2": 1 }]
    }).list;
  },
  "GET /api/fake_list": getFakeList,
  "GET /api/fake_chart_data": () => getFakeChartData,
  "GET /api/profile/basic": () => getProfileBasicData,
  "GET /api/profile/advanced": () => getProfileAdvancedData,
  "POST /api/login/account": ({ params }) => {
    console.log("POST /api/login/account params -->", params);
    const { password, userName } = params;
    return {
      status: password === "888888" && userName === "admin" ? 200 : 401,
      type: "account"
    };
  },
  "POST /api/login/mobile": () => {
    return {
      status: 200,
      type: "mobile"
    };
  },
  "POST /api/register": () => {
    return {};
  },
  "GET /api/notices": () => getNotices
};
