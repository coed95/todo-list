import Delete from "../src/img/delete.svg";

import { handleButtonClick } from "../src/buttonUtils.js";
import { Project, Projects, Todo } from "../src/appLogic.js";

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

        const projectTitle = document.createElement("h1");
        projectTitle.textContent = "Projects";

        const projects = document.createElement("div");
        projects.classList.add("projects-list");
        projects.setAttribute("id", "projects-list");

        const defaultList = document.createElement("div");

        const defaultProjects = Object.entries(Projects)
                                      .filter(([, value]) => typeof value !== 'function')
                                      .slice(0, 3); // Get Home, Today and Week
    
        const customProjects = Object.entries(Projects)
                                     .filter(([, value]) => typeof value !== 'function')
                                     .slice(3); // Get the rest of the projects
    
        defaultProjects.forEach(([projectName, project]) => {
            const button = this.createNavButton(projectName, project.image);
            button.setAttribute("id", "button-" + projectName.toLowerCase());
        
            if (projectName === "Home") {
                button.classList.add("active");
            }
        
            button.addEventListener("click", () => {
                handleButtonClick(button);
            });
        
            defaultList.appendChild(button);
        });
    
        customProjects.forEach(([projectName, project]) => {
            const wrapper = this.createProjectButton(projectName, project.image);
            projects.appendChild(wrapper);
        });

        const projectModal = this.createModal("project-modal");

        const buttonAddProject = this.createNavButton("+ Add Project");
        buttonAddProject.classList.add("button-nav");
        buttonAddProject.setAttribute("id", "button-add-project");

        buttonAddProject.addEventListener("click", () => {
            this.showModal(projectModal);
        });

        const buttonAddProjectModal = projectModal.querySelector("#add-button-project");
        const buttonCancelModalProject = projectModal.querySelector("#cancel-button-project");
        const buttonCloseModalProject = projectModal.querySelector("#close-modal-project");

        buttonAddProjectModal.addEventListener("click", () => {
            const projectModalName = projectModal.querySelector("#project-name").value;
        
            if (!Projects.hasOwnProperty(projectModalName)) {
                Projects.addProject(projectModalName);
        
                const newProject = Projects[projectModalName];
                const wrapper = this.createProjectButton(projectModalName, newProject.image);

                projects.insertBefore(wrapper, buttonAddProject);

                const newButton = wrapper.querySelector(`#button-${projectModalName.toLowerCase()}`);
                newButton.addEventListener("click", () => {
                    const content = document.querySelector(".content");
                    content.className = "content";
                    content.classList.add(projectModalName.toLowerCase());
                    this.renderProject(newProject);
                });
        
                this.resetModal(projectModal);
                this.hideModal(projectModal);
            } else {
                alert(`Project "${projectModalName}" already exists.`);
            }
        });

        buttonCancelModalProject.addEventListener("click", () => {
            this.resetModal(projectModal);
            this.hideModal(projectModal);
        });

        buttonCloseModalProject.addEventListener("click", () => {
            this.resetModal(projectModal);
            this.hideModal(projectModal);
        });

        projects.appendChild(buttonAddProject);

        nav.appendChild(defaultList);
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
        content.classList.add("home");

        const contentTitle = document.createElement("h2");
        contentTitle.classList.add("content-title");

        contentTitle.textContent = "Home";

        const tasks = document.createElement("div");
        tasks.classList.add("task-list");

        const taskModal = this.createModal("task-modal");
        document.body.appendChild(taskModal);

        const buttonAddTask = document.createElement("button");
        buttonAddTask.textContent = "+ Add Task";
        buttonAddTask.classList.add("button-add-task");
        buttonAddTask.setAttribute("id", "button-add-task");

        buttonAddTask.addEventListener("click", () => {
            this.showModal(taskModal);
        });

        const buttonAddModalTask = taskModal.querySelector("#add-button-task");
        const buttonCancelModalTask = taskModal.querySelector("#cancel-button-task");
        const buttonCloseModalTask = taskModal.querySelector("#close-modal-task");

        buttonAddModalTask.addEventListener("click", () => {
            // do nothing for now
        });

        buttonCancelModalTask.addEventListener("click", () => {
            this.resetModal(taskModal);
            this.hideModal(taskModal);
        });

        buttonCloseModalTask.addEventListener("click", () => {
            this.resetModal(taskModal);
            this.hideModal(taskModal);
        });

        const detailsModal = this.createModal("details-modal");
        document.body.appendChild(detailsModal);

        Object.entries(Projects)
            .filter(([key, value]) => typeof value !== 'function')
            .forEach(([projectName, project]) => {
                const button = nav.querySelector("#button-" + projectName.toLowerCase());

                button.addEventListener("click", () => {
                    this.renderProject(Projects[projectName]);
                    content.className = "content";
                    content.classList.add(projectName.toLowerCase());
                });
        });

        content.appendChild(contentTitle);
        content.appendChild(tasks);
        content.appendChild(buttonAddTask);

        main.appendChild(nav);
        main.appendChild(content);

        return main;
    },

    createNavButton: function(buttonName, buttonImg = '') {
        const button = document.createElement("button");
        button.classList.add("button-nav");

        const name = document.createElement("span");
        name.textContent = buttonName;
        name.classList.add("button-text");

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

    createProjectButton: function(projectName, projectImage) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("button-wrapper");
    
        const button = this.createNavButton(projectName, projectImage);
        button.setAttribute("id", "button-" + projectName.toLowerCase());
    
        button.addEventListener("click", () => {
            handleButtonClick(button);
        });
    
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = "&times;";
    
        deleteButton.addEventListener("click", () => {
            const confirmDelete = confirm(`Are you sure you want to delete the project "${projectName}"?`);
    
            if (confirmDelete) {
                Projects.deleteProject(projectName);
                wrapper.remove();
            }
        });
    
        wrapper.appendChild(button);
        wrapper.appendChild(deleteButton);
    
        return wrapper;
    },

    renderProject: function(project) {
        const contentTitle = document.querySelector(".content-title");
        contentTitle.textContent = project.name;
        
        project.todos.forEach(task => {
            this.renderTask(project, task);
        });
    },

    renderTask: function(project, task) {
        const tasks = document.querySelector(".task-list");
        const detailsModal = document.querySelector(".details-modal");

        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("task");
        
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.checked = false;

        const taskName = document.createElement("p");
        taskName.classList.add("task-title");
        taskName.textContent = task.title;

        const taskDetails = document.createElement("button");
        taskDetails.classList.add("task-details");
        taskDetails.textContent = "Details";

        taskDetails.addEventListener("click", () => {
            this.showModal(detailsModal);
        });

        const taskDate = document.createElement("p");
        taskDate.classList.add("task-date");
        taskDate.textContent = task.dueDate;

        const taskImages = document.createElement("div");
        taskImages.classList.add("task-images");

        const taskDelete = document.createElement("img");
        taskDelete.classList.add("img");
        taskDelete.classList.add("task-delete");
        taskDelete.src = Delete;
        taskDelete.alt = "Delete";

        taskDelete.addEventListener("click", () => {
            const index = project.todos.indexOf(task);

            if (index !== -1) {
                project.todos.splice(index, 1);
                // taskWrapper.remove();
            }
            else {
                console.log("Error: Task not found in project");
            }
        });

        taskImages.appendChild(taskDelete);

        taskWrapper.appendChild(taskCheckbox);
        taskWrapper.appendChild(taskName);
        taskWrapper.appendChild(taskDetails);
        taskWrapper.appendChild(taskDate);
        taskWrapper.appendChild(taskImages);

        tasks.appendChild(taskWrapper);

        const taskPriority = task.priority;

        switch (taskPriority) {
            case 1:
                taskWrapper.style.borderLeft = "3px solid green";
                break;

            case 2:
                taskWrapper.style.borderLeft = "3px solid orange";
                break;

            case 3:
                taskWrapper.style.borderLeft = "3px solid red";
                break;

            default:
                console.log("Error: wrong priority argument");
                break;
        }
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
                            <span class="close-modal" id="close-modal-project">&times;</span>
                        </div>
                        <input class="project-name" id="project-name" type="text" placeholder="Title...">
                        <div class="modal-buttons">
                            <button class="add-button" id="add-button-project">Add</button>
                            <button class="cancel-button" id="cancel-button-project">Cancel</button>
                        </div>
                    </div>
                `;
                break;

            case "task-modal":
                modal.innerHTML = `
                    <div class="task-modal-content">
                        <div class="modal-title">
                            <h2>Add a new task</h2>
                            <span class="close-modal" id="close-modal-task">&times;</span>
                        </div>
                        <input class="task-name" id="task-name" type="text" placeholder="Title...">
                        <input class="task-description" id="task-description" type="text" placeholder="Description...">
                        <div class="due-date">
                            <p>Due Date:</p>
                            <input class="new-date" type="date" name="new-todo" required="">
                        </div>
                        <div class="priority-wrapper">
                        <div class="priority">
                            <p class="priority-title">Priority:</p>
                            <input class="low" id="low-priority" type="radio" name="priority" value="low" required="">
                            <label class="low priority-button" for="low-priority">Low</label>
                            <input class="medium" id="medium-priority" type="radio" name="priority" value="medium" required="">
                            <label class="medium priority-button" for="medium-priority">Medium</label>
                            <input class="high" id="high-priority" type="radio" name="priority" value="high" required="">
                            <label class="high priority-button" for="high-priority">High</label>
                        </div>
                    
                        </div>
                        <div class="modal-buttons">
                            <button class="add-button" id="add-button-task">Add</button>
                            <button class="cancel-button" id="cancel-button-task">Cancel</button>
                        </div>
                    </div>
                `;
                break;
            
            case "details-modal":
                modal.innerHTML = `
                    <div class="details-modal-content">
                        <div class="modal-title">
                            <h2></h2>
                            <span class="close-modal" id="close-modal-task">&times;</span>
                        </div>

                        <div class="modal-details-project">
                            <span>Project:</span>
                            <span></span>
                        </div>

                        <div class="modal-details-priority">
                            <span>Priority:</span>
                            <span></span>
                        </div>

                        <div class="modal-details-due-date">
                            <span>Due Date:</span>
                            <span></span>
                        </div>

                        <div class="modal-details-description">
                            <span>Description:</span>
                            </span></span>
                        </div>
                    </div>
                `;
                break;

            default:
                console.log("Error: unknown modal type");
                break;
        }

        modal.style.visibility = "hidden";

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.resetModal(modal);
                this.hideModal(modal);
            }
        });

        return modal;
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
    },

    deleteModal: function(modal) {
        modal.innerHTML = '';
    },
};