import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(<App />);
