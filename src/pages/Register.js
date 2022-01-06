import React from "react";
import Button from "@material-ui/core/Button";
import { CssBaseline, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Register = () => {
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
        <form className="form">
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
      </div>
    </div>
  );
};

export default Register;
