import {
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form className="form">
          <TextField
            autoComplete="email"
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
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
