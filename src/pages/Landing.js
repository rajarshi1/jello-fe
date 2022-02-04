import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const Landing = () => {
  const { user, authIsReady } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!!authIsReady && user) {
      navigate("/dashboard");
    }
  }, [user, authIsReady]);

  if (!authIsReady) {
    return  <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100vh", width: "100vw" }}>
                <CircularProgress />
                <span style={{ justifyContent: "center", position: "fixed", top: "55%" }}>Loading...please wait</span>
            </div>
  }
  return (
    <>
      <section className="landing">
        <nav className="top">
          <h2>Jello</h2>
          <div>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button variant="contained" href="/register">
              Sign Up
            </Button>
          </div>
        </nav>
        <div className="landing-inner">
          <h1>Jello</h1>
          <p>An app for all your management needs</p>
          <div className="buttons">
            <Button variant="outlined" color="inherit" href="/register">
              Sign Up
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
