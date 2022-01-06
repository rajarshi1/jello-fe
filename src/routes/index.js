import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import Landing from "../components/pages/Landing";

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
