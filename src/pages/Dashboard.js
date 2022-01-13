import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import firebase from "firebase/compat/app";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, authIsReady, authDispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleUserLogout = (e) => {
    try {
      const logout = firebase.auth().signOut();
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
    <div className="">
      <nav className="top">
        <h2>Jello</h2>
        <div>
          <Button color="inherit" onClick={handleUserLogout}>
            LOGOUT
          </Button>
        </div>
      </nav>
      <section className="">
        <h1>Welcome {user && user.name ? user.name : ''}</h1>
        <h2>Your Board</h2>
        <ul>
          <li key="1">Board 1</li>
          <li key="2">Board 2</li>
          <li key="3">Board 3</li>
          <li key="4">Board 4</li>
        </ul>
        CreateBoards
      </section>
    </div>
  );
};

export default Dashboard;
