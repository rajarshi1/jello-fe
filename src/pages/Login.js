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
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthContext } from "../hooks/useAuthContext";
import useStyles from '../utils/formStyles';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user, authIsReady, authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (!!authIsReady && user) {
      navigate("/dashboard");
    }
  }, [user, authIsReady]);

  if (!authIsReady) {
    return <p>Loading</p>;
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        authDispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const loginwithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        console.log(userCred);
        authDispatch({ type: "LOGIN", payload: userCred.user });
      });
  };


  const emailInput = () => {
    var email = prompt('Enter email to send reset password link')
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
      window.alert('Reset password email sent please check your mail')
    }).catch((e)=>{
      console.log(e);
    })
  };

  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className="paper">
        <Typography component="h1" variant="h4">
          Jello
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            autoComplete="current-password"
            margin="normal"
            name="password"
            variant="outlined"
            required
            type="password"
            fullWidth
            label="Password"
            autoFocus
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>
         
          <Button fullWidth
            variant="text"
            color="secondary"
            onClick={emailInput}
            >
              forgot password? Click to get reset link
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
   
    </Container>
  );
};

export default Login;
