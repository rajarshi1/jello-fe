import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./config/firebase-config";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  
    <AuthContextProvider>
      <App />
    </AuthContextProvider>,
  document.getElementById("root")
);


