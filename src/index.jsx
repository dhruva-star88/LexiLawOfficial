// import './index.css';
// import React from "react";
// import { render } from "react-dom";
// import { App } from "./App";
// render(<App />, document.getElementById("root"));



import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./AppRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);