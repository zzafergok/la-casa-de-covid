import React from "react";
import { createRoot } from "react-dom/client";

import Router from "./Route/Router";

import "./assets/styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Router />);
