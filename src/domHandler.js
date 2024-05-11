import Home from "../src/img/home.svg";
import Today from "../src/img/today.svg";
import Week from "../src/img/week.svg";

import { handleButtonClick, setActiveButton } from "./buttonUtils";

export const DOMHandler = {
    createHeader: function(name) {
        const header = document.createElement("header");
        header.classList.add("header");

        const title = document.createElement("h1");
        title.classList.add("name");
        title.textContent = name;

        header.appendChild(title);

        return header;
    },

    createNav: function() {
        const nav = document.createElement("nav");
        nav.classList.add("nav");
        nav.setAttribute("id", "nav");

        const taskTitle = document.createElement("h1");
        taskTitle.textContent = "Tasks";

        const buttonHome = this.createButton("Home", Home);
        const buttonToday = this.createButton("Today", Today);
        const buttonWeek = this.createButton("Week", Week);

        buttonHome.classList.add("active");

        buttonHome.addEventListener("click", () => {
            handleButtonClick(buttonHome);
        });

        buttonToday.addEventListener("click", () => {
            handleButtonClick(buttonToday);
        });

        buttonWeek.addEventListener("click", () => {
            handleButtonClick(buttonWeek);
        });

        const projectTitle = document.createElement("h1");
        projectTitle.textContent = "Projects";

        const projects = document.createElement("div");
        projects.classList.add("projects-list");
        projects.setAttribute("id", "projects-list");

        /* code to handle projects here */

        const buttonAddProject = this.createButton("+ Add Project");
        projects.appendChild(buttonAddProject);

        nav.appendChild(taskTitle);
        nav.appendChild(buttonHome);
        nav.appendChild(buttonToday);
        nav.appendChild(buttonWeek);

        nav.appendChild(projectTitle);
        nav.appendChild(projects);

        return nav;
    },

    createMain: function() {
        const main = document.createElement("main");
        main.classList.add("main");

        const nav = this.createNav();
        main.appendChild(nav);

        return main;
    },

    createButton: function(buttonName, buttonImg = '') {
        const button = document.createElement("button");
        button.classList.add("button");

        const name = document.createTextNode(buttonName);

        if (buttonImg) {
            const img = document.createElement("img");
            img.classList.add("img");
            img.src = buttonImg;
            img.alt = buttonName;
            button.appendChild(img);
        }

        button.appendChild(name);

        return button;
    },
};