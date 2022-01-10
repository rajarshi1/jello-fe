import {
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Container,
  Box
} from "@material-ui/core";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import useStyles from '../../utils/formStyles';

const Login = () => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useSelector((state) => console.log(state,state.auth));
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    console.log(dispatch(login(email, password)),login(email,password));
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
  };
  console.log(isAuthenticated);

  const loginwithGoogle = ()=>{
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())   
    .then((userCred)=>{
        console.log(userCred);
    })
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    
    <Container component='main' maxWidth='xs' className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Jello
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <TextField
             variant='outlined'
             margin='normal'
             required
             fullWidth
             label='Email Address'
             name='email'
             autoComplete='email'
             autoFocus
            //  value={email}
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
            // value={password}
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
