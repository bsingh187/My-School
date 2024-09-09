import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Session = lazy(() => import("../views/pages/super-admin/sessions/index.tsx"));
const School = lazy(() => import("../views/pages/super-admin/schools/index.tsx"))
const SchoolAdmin = lazy(() => import("../views/pages/super-admin/schoolAdmin/index.tsx"));
const Role = lazy(() => import("../views/pages/super-admin/roles/index.tsx"));



/*****Routes******/

const ThemeRoutes = [
  {
    path: "",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/session" /> },
      { path: "/session", exact: true, element: <Session /> },
      { path: "/school", exact: true, element: <School /> },
      { path: "/school-admin", exact: true, element: <SchoolAdmin /> },
      { path: "/role", exact: true, element: <Role /> },
    ],
  },
];

export default ThemeRoutes;
