import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import useStyles from "../utils/formStyles";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectAuth } from "../config/firebase-config";

/** using fomik for form validation */
import { useFormik } from "formik";

const auth = getAuth();

const Register = () => {
  const { user, authIsReady, authDispatch } = useAuthContext();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();

  const loginwithEmail = async (values) => {
    // try {
    //   let response = await axios.post('http://localhost:5000/api/auth/signup', {
    //     "name":`${values.name}`,
    //     "email":`${values.email}`,
    //     "password":`${values.password}`
    //   })
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log("test-1", email, password);
    // axios
    //   .post("http://localhost:5000/api/auth/signup", {
    //     name: `${values.name}`,
    //     email: `${values.email}`,
    //     password: `${values.password}`,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(response, "response");
      if (!response) {
        throw new Error("Unable to sign up user");
      }

      //add display name to user
      await updateProfile(auth.currentUser, { displayName: values.name });

      //dispatch login action
      authDispatch({ type: "LOGIN", payload: response.user });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  /** create LoginValidate to pass in formik object */
  const registerValidate = (values) => {
    const errors = {};

    /** check for email */
    if (!values.name) {
      errors.name = "Name Required";
    }

    /** check for email */
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    /** check for password value */
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 8) {
      errors.password = "Password length should be 8 digit atleast";
    }

    /** checking for password2 and matching with password */
    if (!values.password2) {
      errors.password2 = "Confirm Password Required";
    } else if (values.password !== values.password2) {
      errors.password2 = "Password and Confirm password didn't match";
    }

    console.log(errors, "errors");
    return errors;
  };

  /** create loginFormik object with useFormik to handle login form submission */
  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginwithEmail,
    validate: registerValidate,
  });

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
        console.log(
          "hi",
          userCred.additionalUserInfo.profile.email,
          userCred.additionalUserInfo.profile.name
        );
        axios
          .post("http://localhost:5000/api/auth/signup", {
            name: `${userCred.additionalUserInfo.profile.name}`,
            email: `${userCred.additionalUserInfo.profile.email}`,
            password: "password",
          })
          .then(function (response) {
            console.log("from axios", response);
          })
          .catch(function (error) {
            console.log(error);
          });
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            auth,
            userCred.additionalUserInfo.profile.email,
            userCred.additionalUserInfo.profile.password
          )
          .then((userCred) => {
            authDispatch({ type: "LOGIN", payload: userCred.user });
            console.log(userCred.user);
            navigate("/dashboard");
          })
          .catch((error) => {
            console.log(error.code, error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      });
  };

  // const loginwithEmail = ()=>{
  //   firebase.auth().createUserWithEmailAndPassword(email,password)
  // }

  // function dataToMongo(e){
  //     e.preventDefault();
  //     console.log('testmongo');
  //     axios.post('http://localhost:3000/api/auth/signup', {
  //     "name":`${name}`,
  //     "email":`${email}`,
  //     "password":`${password}`
  //   })
  //   .then(function (response) {
  //     console.log('from axios',response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  const LoginWithEmail = async (e) => {
    e.preventDefault();
    console.log("testing");

    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'error'));
    } else {
      dispatch(register({ name, email, password }));
    }
    
    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response, "response");
      if (!response) {
        throw new Error("Unable to sign up user");
      }}

  // const loginwithEmail = ()=>{
  //   const auth = getAuth();
  //   console.log('tttttt',auth);
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //   // Signed in
  //   // Signed in
  //   const user = userCredential.user;
  //   console.log(user);
  //   // ...
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
  // }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Jello
        </Typography>
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
        {/* <form className="form" onSubmit={(e) => onSubmit(e)}> */}
        <form
          className="form"
          onSubmit={registerFormik.handleSubmit}
          method="POST"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                fullWidth
                label="Your Name"
                {...registerFormik.getFieldProps("name")}
              />
              {registerFormik.touched.name && registerFormik.errors.name ? (
                <div className="errors">{registerFormik.errors.name}</div>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                type="email"
                fullWidth
                label="Email Address"
                {...registerFormik.getFieldProps("email")}
              />
              {registerFormik.touched.email && registerFormik.errors.email ? (
                <div className="errors">{registerFormik.errors.email}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                {...registerFormik.getFieldProps("password")}
              />
              {registerFormik.touched.password &&
              registerFormik.errors.password ? (
                <div className="errors">{registerFormik.errors.password}</div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password2"
                type="password"
                variant="outlined"
                fullWidth
                label="Confirm Password"
                {...registerFormik.getFieldProps("password2")}
              />
              {registerFormik.touched.password2 &&
              registerFormik.errors.password2 ? (
                <div className="errors">{registerFormik.errors.password2}</div>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={loginwithGoogle}
          >
            Sign-up with Google
          </Button>
          <br />
          <Grid container>
            <Grid container justifyContent="flex-end">
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
