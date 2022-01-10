import {initializeApp} from "firebase/app";
const firebaseAuth =require("firebase/auth");
// const app = initializeApp({
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
//   });
export const auth=firebaseAuth.getAuth();

export const createUserWithEmailAndPassword=(email,password)=>{
  return firebaseAuth.createUserWithEmailAndPassword(auth,email,password);
}

export const onAuthStateChange=(callback)=>{
  return firebaseAuth.onAuthStateChanged(auth,callback);
}

export const signInWithEmailAndPassword=(email,password)=>{
  return firebaseAuth.signInWithEmailAndPassword(auth,email,password);
}
export const signOut=()=>{
  return firebaseAuth.signOut(auth);
} 

export const sendPasswordResetEmail=(email)=>{
  return firebaseAuth.sendPasswordResetEmail(auth,email);
}
// export default app;

