import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import OperationProvider from "./store/OperationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <OperationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </OperationProvider>
);
