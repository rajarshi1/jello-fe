import Register from "../pages/Register";
import Login from "../pages/Login";
import Landing from "../pages/Landing";

const routes = [
  {
    path: "/register",
    component: Register,
    title: "Register",
  },
  {
    path: "/login",
    component: Login,
    title: "Login",
  },
  {
    path: "/",
    component: Landing,
    title: "Jello",
  },
];
export default routes;
