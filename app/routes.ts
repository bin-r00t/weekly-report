import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix('history', [
    layout('./routes/history/layout.tsx', [
        index('./routes/history/index.tsx')
    ])
  ]),
  ...prefix('current', [
    layout('./routes/current/layout.tsx', [
      index('./routes/current/index.tsx'),
      route('create', './routes/current/create.tsx'),
      route(':id', './routes/current/detail.tsx')
    ])
  ])
] satisfies RouteConfig;
