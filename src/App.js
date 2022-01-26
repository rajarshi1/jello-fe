import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Board from "./pages/Board";
import Alert from "./components/other/Alert";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NoFoundRoute from "./pages/NoRouteFound/NoRouteFound";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/board/:id" element={<Board />} />
            </Route>
            <Route path="*" element={<NoFoundRoute />}></Route>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
