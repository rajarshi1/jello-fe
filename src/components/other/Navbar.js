import React from 'react';
import { useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import firebase from "firebase/compat/app";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const { user, authIsReady, authDispatch } = useAuthContext();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!authIsReady && !user) {
      navigate("/login");
    }
  }, [user, authIsReady]);

  // if (!isAuthenticated) {
  //   return '';
  // }

  const handleUserLogout = (e) => {
    dispatch(logout());
    try {
      const logout = firebase.auth().signOut();
      console.log(logout);
      if (!logout) {
        throw new Error("Unable to logout");
      }
      authDispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>Jello</Link>
      <Link to='/' onClick={handleUserLogout}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;