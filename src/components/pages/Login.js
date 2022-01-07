import {
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email,password);
    // dispatch(login(email, password));
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
