import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChange,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "../service/firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return signOut();
  };

  const resetUserPassword = (email) => {
    return sendPasswordResetEmail(email);
  };

  const value = {
    currentUser,
    signUpUser: signUp,
    signIn: login,
    logOut,
    resetUserPassword,
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChange((user) => {
      if (user) {
        const { proactiveRefresh } = user;
        if (proactiveRefresh && proactiveRefresh.user) {
          setCurrentUser(proactiveRefresh.user);
        }
      }

      setLoading(false);
    });

    return unsubcribe;
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;