// import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "./Pages/Home/index"
import AddEmp from "./Pages/AddEmp/index"

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
              { path: "home", element: <HomePage /> },
              { path: "empdetails", element: <h1> empDetails</h1>},
              { path: "managerdetails", element: <h1> managerdetails</h1>},
              { path: "deptdetails", element: <h1> deptdetails</h1>},
              { path: "promote", element: <h1> promote</h1>},
              { path: "add", element: <AddEmp/> },
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
