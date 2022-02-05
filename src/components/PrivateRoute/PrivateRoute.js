import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';

function PrivateRoute({ component: Component, ...rest }) {
  const { user,authIsReady } = useAuthContext();
  if(!authIsReady){

    return  <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100vh", width: "100vw" }}>
                  <CircularProgress />
                 <span style={{ justifyContent: "center", position: "fixed", top: "55%" }}>Loading...please wait</span>
            </div>
  }

  return user ? <Outlet /> : <Navigate to="/login/" />;
}

export default PrivateRoute;