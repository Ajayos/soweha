// import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";

export default function Router() {
  const isAuthenticated = false;
  const access = false;

  const routes = useRoutes([
    ...(!access
      ? [
          {
            path: "/",
            // element: <Topbar />,
            children: [
              { element: <Navigate to="/home" />, index: true },
              { path: "home", element: <h1>user router </h1> },
            ],
          },
        ]
      : []),
    ...(isAuthenticated && access
      ? [
          {
            path: "/",
            //element: <Layout />,
            children: [
              { element: <Navigate to="/home" />, index: true },
              { path: "home", element: <h1>Admin router </h1> },
            ],
          },
        ]
      : []),
    {
      path: "/500",
      children: [{ element: <h1>500 router </h1>, index: true }],
    },
    {
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "404", element: <h1> 404 </h1> },
        { path: "*", element: <h1>to 404 </h1> },
      ],
    },
  ]);

  return routes;
}
