import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';


const Landing = () => {
  return (
    <>
      <section className='landing'>
        <nav className='top'>
        <h2>Jello</h2>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Sign Up
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>Jello</h1>
        <p>
          An app for all your management needs
        </p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
    </>
  );
};

export default Landing;
