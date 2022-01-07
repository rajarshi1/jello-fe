import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setAlert } from '../../actions/alert';
import Button from "@material-ui/core/Button";
import { CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Register = () => {

  const loginwithGoogle = ()=>{
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())   
    .then((userCred)=>{
        console.log('hi',userCred);

    })
  }

  // const loginwithEmail = ()=>{
  //   firebase.auth().createUserWithEmailAndPassword(email,password)
  // }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const loginwithEmail = ()=>{
    console.log('test-1',email,password);
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userCred)=>{
      console.log(userCred);
    })
    .catch((error) => {
      console.log(error.code,error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

//   const loginwithEmail = ()=>{
//     const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
//   }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // dispatch(setAlert('Passwords do not match', 'error'));
      console.log('passwords dont match');
    } else {
      // dispatch(register({ name, email, password }));
      console.log('hi',name,email,password);
    }
  };

  return (
    <div className="container">
      <CssBaseline />
      <div className="paper">
        <Typography component="h1" variant="h4">
          jello
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* <form className="form" onSubmit={(e) => onSubmit(e)}> */}
        <form className="form" onSubmit={loginwithEmail}>
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
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid container justifyContent="flex-end">
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <button onClick={loginwithGoogle}>Login with google</button>
      </div>
    </div>
  );
};

export default Register;
