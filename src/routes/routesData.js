import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const publicRoutes = [
  { path: "/login", element: Login, label: "Login" },
  { path: "/signup", element: Signup, label: "Signup" },
];

export const privateRoutes = [
  { path: "/dashboard", element: Dashboard, label: "Dashboard" },
];
