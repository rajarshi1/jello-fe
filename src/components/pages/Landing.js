import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { user, authIsReady } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!!authIsReady && user) {
      navigate("/dashboard");
    }
  }, [user, authIsReady]);

  if (!authIsReady) {
    return <p>Loading</p>;
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
