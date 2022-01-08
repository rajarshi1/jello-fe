// import logo from './logo.svg';
//test
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  
  const loginwithGoogle = ()=>{
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())   
    .then((userCred)=>{
        console.log(userCred);
    })
  }

  const logout = ()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('logged out successfully');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              element={<route.component />}
              render={(props) => <route.component {...props} />}
            ></Route>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
