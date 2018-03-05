export const menuData = [
  {
    name: "dashboard",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "Analysis page",
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
        name: "Advanced Form",
        authority: "admin",
        path: "advanced-form"
      }
    ]
  },
  {
    name: "List page",
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
        name: "Advanced details page",
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
