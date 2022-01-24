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
import { useFormik } from "formik";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user, authIsReady:isAuthenticated, authDispatch } = useAuthContext();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

 

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (values) => {
    // e.preventDefault();
    // dispatch(login(values.email, values.password));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        authDispatch({ type: "LOGIN_SUCCESS", payload: user });
        authDispatch({type:"USER_LOADED", payload:user });
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(error);
        if (error.message=='Firebase: Error (auth/wrong-password).'){
          alert('Wrong password')
        }
      });
  };

  const loginwithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
      
        // authDispatch({ type: "LOGIN", payload: userCred.user });
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
    // console.log(errors, "errors");
    return errors;
  };

  /** create loginFormik object with useFormik to handle login form submission */
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit,
    validate: LoginValidate,
  });

  useEffect(() => {
    if (!!isAuthenticated && user) {
    
      navigate("/dashboard");
    }
  }, [user, isAuthenticated]);


  // if (!isAuthenticated) {
  //   return <p>Loading</p>;
  // }

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
        <form className="form" onSubmit={loginFormik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
            value={email}
            // onChange={(e) => onChange(e)}
            {...loginFormik.getFieldProps("email")}
          />
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="errors">{loginFormik.errors.email}</div>
          ) : null}
          <TextField
            autoComplete="current-password"
            margin="normal"
            name="password"
            variant="outlined"
            required
            type="password"
            fullWidth
            label="Password"
            // autoFocus
            value={password}
            // onChange={(e) => onChange(e)}
            {...loginFormik.getFieldProps("password")}
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
