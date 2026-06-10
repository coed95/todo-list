import "./style.css";
import { initApp } from "./modules/app.js";
import { render, setupEventListeners } from "./modules/dom.js";

initApp();
setupEventListeners();
render();