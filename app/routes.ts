import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "./routes/login.tsx"),
  ...prefix("history", [
    layout("./routes/history/layout.tsx", [
      index("./routes/history/index.tsx"),
    ]),
  ]),
  ...prefix("thisweek", [
    layout("./routes/thisweek/layout.tsx", [
      index("./routes/thisweek/index.tsx"),
      route("create", "./routes/thisweek/create.tsx"),
      route(':id', './routes/thisweek/detail.tsx')
    ]),
    // layout('./routes/current/layout.tsx', [
    //   index('./routes/current/index.tsx'),
    //   route('create', './routes/current/create.tsx'),
    //   route(':id', './routes/current/detail.tsx')
    // ])
  ]),
] satisfies RouteConfig;
