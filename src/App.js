// import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
      <header className="App-header">
       <h1>Jello</h1> 
       <p>An app for all your management needs</p>
       <button onClick={loginwithGoogle}>Login with Google</button>
       <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
