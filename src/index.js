// index.js or index.jsx

import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import your other styles
import "./global.css"; // Import the global styles
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
