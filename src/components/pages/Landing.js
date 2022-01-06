import React from "react";
import Header from "./other/Header";
import { Button } from '@material-ui/core';

const Landing = () => {
  return (
    <>
      <Header />
      <div className="App-header">
        <h1>Jello</h1>
        <p>An app for all your management needs</p>
      </div>
      <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
      </div>
    </>
  );
};

export default Landing;
