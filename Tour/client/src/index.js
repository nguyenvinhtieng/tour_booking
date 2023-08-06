import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ToastContainer />
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);