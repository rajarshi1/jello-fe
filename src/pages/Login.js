import {
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

/** using fomik for form validation */
import { useFormik } from "formik";

const Login = () => {
  const { user, authIsReady, authDispatch } = useAuthContext();
  const navigate = useNavigate();

  /** login with email */
  const loginWithEmail = async (values) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        authDispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  /** create LoginValidate to pass in formik object */
  const LoginValidate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }
    console.log(errors, "errors");
    return errors;
  };

  /** create loginFormik object with useFormik to handle login form submission */
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginWithEmail,
    validate: LoginValidate,
  });

  /** using useEffect to check the user and authIsReady */
  useEffect(() => {
    if (!!authIsReady && user) {
      navigate("/dashboard");
    }
  }, [user, authIsReady]);

  if (!authIsReady) {
    return <p>Loading</p>;
  }

  const loginwithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        console.log(userCred);
        authDispatch({ type: "LOGIN", payload: userCred.user });
      });
  };

  return (
    <div className="container">
      <CssBaseline />
      <div className="paper">
        <Typography component="h1" variant="h4">
          Jello
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className="form" onSubmit={loginFormik.handleSubmit}>
          <TextField
            id="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
          />
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="errors">{loginFormik.errors.email}</div>
          ) : null}
          <TextField
            id="password"
            autoComplete="current-password"
            margin="normal"
            name="password"
            variant="outlined"
            required
            type="password"
            fullWidth
            label="Password"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
          />
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <div className="errors">{loginFormik.errors.password}</div>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={loginwithGoogle}
          >
            Sign-In with Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Login;
