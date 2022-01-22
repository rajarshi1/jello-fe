import { createContext, useEffect, useReducer } from "react";
import { getAuth } from "firebase/auth";
import {
  reducer as authReducer,
  initialState as authInitialState,
} from "../reducers/auth";

export const AuthContext = createContext();
const auth = getAuth();

export const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  // console.log(authState);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      authDispatch({ type: "AUTH_IS_READY", payload: user });
    });
    return unsub;
  }, []);
  // console.log("AuthContext state:", authState);
  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};