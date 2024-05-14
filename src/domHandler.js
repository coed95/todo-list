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

        const projectModal = this.createModal("project-modal");

        const buttonAddProject = this.createButton("+ Add Project");
        buttonAddProject.classList.add("button");
        buttonAddProject.setAttribute("id", "button-add-project");

        const cancelButton = projectModal.querySelector("#cancel-button");

        buttonAddProject.addEventListener("click", () => {
            this.showModal(projectModal);
        });

        cancelButton.addEventListener("click", () => {
            this.hideModal(projectModal);
        });

        // code to handle projects here

        projects.appendChild(buttonAddProject);

        nav.appendChild(taskTitle);
        nav.appendChild(buttonHome);
        nav.appendChild(buttonToday);
        nav.appendChild(buttonWeek);

        nav.appendChild(projectTitle);
        nav.appendChild(projects);
        nav.appendChild(projectModal);

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

    createModal: function(modalName) {
        const modal = document.createElement("div");
        modal.classList.add(modalName);

        switch (modalName) {
            case "project-modal":
                modal.innerHTML = `
                    <div class="modal-content">
                        <input type="text" placeholder="Title...">
                        <div class="modal-buttons">
                            <button id="add-button">Add</button>
                            <button id="cancel-button">Cancel</button>
                        </div>
                    </div>
                `;
                break;

            case "task-modal":
                modal.innerHTML = `
                    <div class="modal-content">
                        <input type="text" placeholder="Title...">
                        <input type="text" placeholder="Description...">
                        <div class="due-date">
                            <p>Due Date:</p>
                            <input class="new-date" type="date" name="new-todo" required="">
                        </div>
                        <div class="priority">
                            <p>Priority:</p>
                            <input class="low-priority" id="low-priority" type="radio" value="low" required="">
                            <label for="low-priority">Low</label>
                            <input class="medium-priority" id="medium-priority" type="radio" value="medium" required="">
                            <label for="medium-priority">Medium</label>
                            <input class="high-priority" id="high-priority" type="radio" value="high" required="">
                            <label for="high-priority">High</label>
                        </div>
                        <div class="modal-buttons">
                            <button id="add-button">Add</button>
                            <button id="cancel-button">Cancel</button>
                        </div>
                    </div>
                `;
                break;
        }

        // this.centerModal(modal);
        modal.style.display = "none";

        return modal;
    },

    showModal: function(modal) {
        modal.style.display = "block";
    },

    hideModal: function(modal) {
        modal.style.display = "none";
    },

    centerModal: function(modal) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const modalHeight = modal.offsetHeight;
        const modalWidth = modal.offsetWidth;
    
        const top = (windowHeight - modalHeight) / 2;
        const left = (windowWidth - modalWidth) / 2;
    
        modal.style.top = top + "px";
        modal.style.left = left + "px";
    },
};