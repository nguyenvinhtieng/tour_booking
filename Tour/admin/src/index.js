import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <ToastContainer />
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
