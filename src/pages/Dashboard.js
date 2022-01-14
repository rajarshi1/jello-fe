import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
<<<<<<< HEAD
=======
import { useSelector, useDispatch } from 'react-redux';
import { getBoards } from '../actions/board';
import { loadUser } from '../actions/auth';
>>>>>>> 4631498879acb3900617529f264914792f0aa16d
import firebase from "firebase/compat/app";
// import { Link } from "react-router-dom";

const Dashboard = () => {
<<<<<<< HEAD
  const { user, authIsReady, authDispatch } = useAuthContext();
=======
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const { user, authIsReady, authDispatch } = useAuthContext();
  const dispatch = useDispatch();
>>>>>>> 4631498879acb3900617529f264914792f0aa16d
  const navigate = useNavigate();
  console.log(user,isAuthenticated);

<<<<<<< HEAD
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
=======
  useSelector((state)=>console.log(state));

  // useEffect(() => {
  //   if (!!authIsReady && !user) {
  //     navigate("/login");
  //   }
  // }, [user, authIsReady]);
  
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  
  // console.log(user);
  
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);

  
 
  
  // if (!authIsReady) {
  //   return <p>Loading</p>;
  // }
  
  
  // const handleUserLogout = (e) => {
  //   try {
  //     const logout = firebase.auth().signOut();
  //     console.log(logout);
  //     if (!logout) {
  //       throw new Error("Unable to logout");
  //     }
  //     authDispatch({ type: "LOGOUT" });
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
>>>>>>> 4631498879acb3900617529f264914792f0aa16d

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
