import { isUrl } from "../utils/utils";

export const menuData = [
  {
    name: "admin",
    icon: "dashboard",
    path: "admin",
    children: [
      {
        name: "users",
        path: "users"
      },
      {
        name: "programs",
        path: "programs"
      },
      {
        name: "workshops",
        path: "workshops" // hideInMenu: true,
      }
    ]
  },
  {
    name: "dashboard",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "analysis page",
        path: "analysis"
      },
      {
        name: "monitor page",
        path: "monitor"
      },
      {
        name: "workplace",
        path: "workplace" // hideInMenu: true,
      }
    ]
  },
  {
    name: "form page",
    icon: "form",
    path: "form",
    children: [
      {
        name: "basic form",
        path: "basic-form"
      },
      {
        name: "step-by-step form",
        path: "step-form"
      },
      {
        name: "advanced Form",
        authority: "admin",
        path: "advanced-form"
      }
    ]
  },
  {
    name: "list page",
    icon: "table",
    path: "list",
    children: [
      {
        name: "query form",
        path: "table-list"
      },
      {
        name: "standard list",
        path: "basic-list"
      },
      {
        name: "card list",
        path: "card-list"
      },
      {
        name: "search list",
        path: "search",
        children: [
          {
            name: "search list (article)",
            path: "articles"
          },
          {
            name: "search list (project)",
            path: "projects"
          },
          {
            name: "search list (application)",
            path: "applications"
          }
        ]
      }
    ]
  },
  {
    name: "details page",
    icon: "profile",
    path: "profile",
    children: [
      {
        name: "basic details page",
        path: "basic"
      },
      {
        name: "advanced details page",
        path: "advanced",
        authority: "admin"
      }
    ]
  },
  {
    name: "result page",
    icon: "check-circle-o",
    path: "result",
    children: [
      {
        name: "success",
        path: "success"
      },
      {
        name: "failed",
        path: "fail"
      }
    ]
  },
  {
    name: "abnormal page",
    icon: "warning",
    path: "exception",
    children: [
      {
        name: "403",
        path: "403"
      },
      {
        name: "404",
        path: "404"
      },
      {
        name: "500",
        path: "500"
      },
      {
        name: "trigger exception",
        path: "trigger",
        hideInMenu: true
      }
    ]
  },
  {
    name: "account",
    icon: "user",
    path: "user",
    authority: "guest",
    children: [
      {
        name: "login",
        path: "login"
      },
      {
        name: "registration",
        path: "register"
      },
      {
        name: "registration result",
        path: "register-result"
      }
    ]
  }
];

function formatter(data, parentPath = "/", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
