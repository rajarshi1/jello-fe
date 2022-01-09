import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
const projectAuth = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyB3STkr2K055HdMD6kgJKOUQctdCq_hCls",
  authDomain: "jello-b8362.firebaseapp.com",
  projectId: "jello-b8362",
  storageBucket: "jello-b8362.appspot.com",
  messagingSenderId: "890079533370",
  appId: "1:890079533370:web:ac9ebc3606ec1bf14c1803",
  measurementId: "G-M349CN9D0T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export { projectAuth };
