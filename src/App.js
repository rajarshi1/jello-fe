import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Alert from "./components/other/Alert";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const loginwithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        console.log(userCred);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("logged out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
