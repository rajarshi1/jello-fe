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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import useStyles from "../utils/formStyles";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectAuth } from "../config/firebase-config";

const auth = getAuth();


const Register = () => {
  const { user, authIsReady, authDispatch } = useAuthContext();
  const [btnDisabled, setBtnDisabled] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loadStatus = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useSelector((state) => console.log(state));
  console.log(loadStatus);
  const classes = useStyles();
  const navigate = useNavigate();

  // if(loadStatus&&btnDisabled==false){
  //   setBtnDisabled(false);
  // }
  // else{
  //   setBtnDisabled(true);
  // }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
          .createUserWithEmailAndPassword(auth, email, password)
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


  const LoginWithEmail = async (e) => {
    e.preventDefault();
    console.log("testing");

    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'error'));
      return;
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
      }

      authDispatch({ type: "LOGIN", payload: response.user });
      // navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

 

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // dispatch(setAlert('Passwords do not match', 'error'));
      console.log("passwords dont match");
    } else {
      // dispatch(register({ name, email, password }));
      console.log("hi", name, email, password);
    }
  };

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
        <form className="form" onSubmit={LoginWithEmail} method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Your Name"
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                type="email"
                fullWidth
                label="Email Address"
                autoFocus
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password2"
                type="password"
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                autoFocus
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            disabled={btnDisabled}
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
}
export default Register;
