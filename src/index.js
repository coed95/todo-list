import "./css/header.css";
import "./css/main.css";
import "./css/modal.css";
import "./css/style.css";

import { DOMHandler } from "./domHandler.js";

document.body.appendChild(DOMHandler.createHeader("Todo List"));
document.body.appendChild(DOMHandler.createMain());