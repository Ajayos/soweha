// import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "./Pages/Home/index";
import AddEmp from "./Pages/AddEmp/index";
import EmployeeDetails from "./Pages/EmpDetails";
import Promote from "./Pages/Promote/index";
import LoginPage from "./Pages/Auth/index";
import useAuth from "./hooks/useAuth";
import Manager from "./Pages/Manager/index";
export default function Router() {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    ...(isAuthenticated
      ? [
          {
            path: "/",
            // element: <Topbar />,
            children: [
              { element: <Navigate to="/dashboard" />, index: true },
              { path: "dashboard", element: <HomePage /> },
              { path: "empdetails", element: <EmployeeDetails />},
              { path: "managerdetails", element: <Manager />},
              { path: "deptdetails", element: <h1> deptdetails</h1>},
              { path: "promote", element: <Promote />},
              { path: "add", element: <AddEmp/> },
            ],
          },
        ]
      : []),
    ...(!isAuthenticated
      ? [
          {
            path: "/",
            //element: <Layout />,
            children: [
              { element: <Navigate to="/login" />, index: true },
              { path: "login", element: <LoginPage /> },
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
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "404", element: <h1> 404 </h1> },
        { path: "*", element: <h1>to 404 </h1> },
      ],
    },
  ]);

  return routes;
}
