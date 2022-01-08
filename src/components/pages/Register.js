import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setAlert } from '../../actions/alert';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const auth = getAuth();

const Register = () => {

  const loginwithGoogle = ()=>{
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())   
    .then((userCred)=>{
        console.log('hi',userCred.additionalUserInfo.profile.email,userCred.additionalUserInfo.profile.name);
            axios.post('http://localhost:5000/api/auth/signup', {
              "name":`${userCred.additionalUserInfo.profile.name}`,
              "email":`${userCred.additionalUserInfo.profile.email}`,
              "password":"password"
            })
            .then(function (response) {
              console.log('from axios',response);
            })
            .catch(function (error) {
              console.log(error);
            });
            firebase.auth().createUserWithEmailAndPassword(auth,email,password)
            .then((userCred)=>{
              console.log(userCred);
            })
            .catch((error) => {
              console.log(error.code,error.message);
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
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
    axios.post('http://localhost:5000/api/auth/signup', {
      "name":`${name}`,
      "email":`${email}`,
      "password":`${password}`
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

   
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
    })
    .catch((error) => {
      console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

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

  // function submit() {
  //   console.log('submittttt');
  //   loginwithEmail();
  //   dataToMongo();
  // }

  // const loginwithEmail = ()=>{
  //   const auth = getAuth();
  //   console.log('tttttt',auth);
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
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
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={loginwithGoogle}
          >
            Sign-up with Google
          </Button>
          <br/>
          <Grid container>
            <Grid container justifyContent="flex-end">
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Register;
