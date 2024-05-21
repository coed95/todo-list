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

        const buttonHome = this.createNavButton("Home", Home);
        const buttonToday = this.createNavButton("Today", Today);
        const buttonWeek = this.createNavButton("Week", Week);

        buttonHome.setAttribute("id", "button-home");
        buttonToday.setAttribute("id", "button-today");
        buttonWeek.setAttribute("id", "button-week");

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

        const buttonAddProject = this.createNavButton("+ Add Project");
        buttonAddProject.classList.add("button-nav");
        buttonAddProject.setAttribute("id", "button-add-project");

        buttonAddProject.addEventListener("click", () => {
            this.showModal(projectModal);
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

        const content = document.createElement("div");
        content.classList.add("content");

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("content-title");

        contentTitle.textContent = "Home";

        const tasks = document.createElement("div");
        tasks.classList.add("task-list");

        const buttonAddTask = document.createElement("button");
        buttonAddTask.classList.add("button-add-task");
        buttonAddTask.setAttribute("id", "button-add-task");

        buttonAddTask.textContent = "+ Add Task";

        const buttonHome = nav.querySelector("#button-home");
        const buttonToday = nav.querySelector("#button-today");
        const buttonWeek = nav.querySelector("#button-week");

        buttonHome.addEventListener("click", () => {
            this.loadContent("home");
        });

        buttonToday.addEventListener("click", () => {
            this.loadContent("today");
        });

        buttonWeek.addEventListener("click", () => {
            this.loadContent("week");
        });

        buttonAddTask.addEventListener("click", () => {
            alert("nigger");
        });

        content.appendChild(contentTitle);
        content.appendChild(taskList);
        content.appendChild(buttonAddTask);

        main.appendChild(nav);
        main.appendChild(content);

        return main;
    },

    createNavButton: function(buttonName, buttonImg = '') {
        const button = document.createElement("button");
        button.classList.add("button-nav");

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
        modal.setAttribute("id", modalName);

        switch (modalName) {
            case "project-modal":
                modal.innerHTML = `
                    <div class="project-modal-content">
                        <div class="modal-title">
                            <h2>Add a new project</h2>
                            <span class="close-modal" id="close-modal">&times;</span>
                        </div>
                        <input class="project-name" id="project-name" type="text" placeholder="Title...">
                        <div class="modal-buttons">
                            <button id="add-button">Add</button>
                            <button id="cancel-button">Cancel</button>
                        </div>
                    </div>
                `;

                const cancelButton = modal.querySelector("#cancel-button");
                const closeModalButton = modal.querySelector("#close-modal");

                cancelButton.addEventListener("click", () => {
                    this.resetModal(modal);
                    this.hideModal(modal);
                });
        
                closeModalButton.addEventListener("click", () => {
                    this.resetModal(modal);
                    this.hideModal(modal);
                });

                break;

            case "task-modal":
                modal.innerHTML = `
                    <div class="task-modal-content">
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

                default:
                    console.log("Error: unknown modal type");
                    break;
        }

        modal.style.visibility = "hidden";

        return modal;
    },

    loadContent: function(page) {
        const content = document.querySelector(".content");
        const contentTitle = document.querySelector(".content-title");
        const taskList = document.querySelector(".task-list");

        switch (page) {
            case "home":
                contentTitle.textContent = "Home";
                // load all tasks
                break;
            
            case "today":
                contentTitle.textContent = "Today";
                // load daily tasks
                break;

            case "week":
                contentTitle.textContent = "Week";
                // load weekly tasks
                break;

            default:
                console.log("Error: unknown page name");
                break;
        }
    },

    showModal: function(modal) {
        modal.style.visibility = "visible";
    },

    hideModal: function(modal) {
        modal.style.visibility = "hidden";
    },

    resetModal: function(modal) {
        switch (modal.id) {
            case "project-modal":
                modal.querySelector(".project-name").value = '';
                break;

            case "task-modal":
                modal.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
                modal.querySelector(".new-date").value = '';
                modal.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
                break;

            default:
                console.log("Error: unknown modal type");
                break;
        }
    }
};