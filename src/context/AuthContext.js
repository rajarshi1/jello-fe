import { createContext, useEffect, useReducer } from "react";
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log(authState);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      authDispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);
  console.log("AuthContext state:", authState);
  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
