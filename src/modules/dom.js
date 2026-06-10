import {
    state,
    getSelectedProject,
    selectProject,
    addProject,
    addTodo,
    deleteProject,
    deleteTodo,
    toggleTodoCompleted,
    editTodo,
    editProject,
    projectNameExists,
} from "./app.js";

import { format, parseISO } from "date-fns";

function formatDueDate(dueDate) {
    if (!dueDate) {
        return "No date";
    }

    return format(parseISO(dueDate), "MMM d, yyyy");
}

function createProjectElement(project) {
    const projectItem = document.createElement("li");

    if (project.id === state.selectedProjectId) {
        projectItem.classList.add("active-project");
    }

    projectItem.addEventListener("click", () => {
        selectProject(project.id);
        render();
    });

    const projectName = document.createElement("span");
    projectName.textContent = project.name;

    const editButton = document.createElement("button");
    editButton.textContent = "✎";
    editButton.classList.add("edit-project-btn");

    editButton.addEventListener("click", (event) => {
        event.stopPropagation();

        openProjectModal(project);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-project-btn");

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        deleteProject(project.id);
        render();
    });

    projectItem.appendChild(projectName);
    projectItem.appendChild(editButton);
    projectItem.appendChild(deleteButton);

    return projectItem;
}

function createTodoElement(todo) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    if (todo.completed) {
        todoItem.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
        toggleTodoCompleted(todo.id);
        render();
    });

    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");

    const todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;

    const todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description || "No description";

    const todoMeta = document.createElement("div");
    todoMeta.classList.add("todo-meta");

    const dueDate = document.createElement("span");
    dueDate.textContent = `Due: ${formatDueDate(todo.dueDate)}`;

    const priority = document.createElement("span");
    priority.classList.add("priority", `priority-${todo.priority}`);
    priority.textContent = todo.priority;

    todoMeta.appendChild(dueDate);
    todoMeta.appendChild(priority);

    todoInfo.appendChild(todoTitle);
    todoInfo.appendChild(todoDescription);
    todoInfo.appendChild(todoMeta);

    const editButton = document.createElement("button");
    editButton.textContent = "✎";

    editButton.addEventListener("click", () => {
        openTodoModal(todo);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id);
        render();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoInfo);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    return todoItem;
}

function render() {
    renderProjects();
    renderTodos();
}

function renderProjects() {
    const projectList = document.querySelector("#project-list");

    projectList.innerHTML = "";

    state.projects.forEach((project) => {
        const projectElement = createProjectElement(project);
        projectList.appendChild(projectElement);
    });
}

function renderTodos() {
    const currentProjectTitle = document.querySelector("#current-project-title");
    const todoList = document.querySelector("#todo-list");

    const selectedProject = getSelectedProject();

    if (!selectedProject) {
        return;
    }

    currentProjectTitle.textContent = selectedProject.name;
    todoList.innerHTML = "";

    if (selectedProject.todos.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No todos yet. Add one to get started.";

        todoList.appendChild(emptyMessage);

        return;
    }

    selectedProject.todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

function openTodoModal(todo = null) {
    const modal = document.querySelector("#todo-modal");
    const modalTitle = document.querySelector("#todo-modal-title");
    const todoForm = document.querySelector("#todo-form");

    const todoIdInput = document.querySelector("#todo-id");
    const titleInput = document.querySelector("#todo-title");
    const descriptionInput = document.querySelector("#todo-description");
    const dueDateInput = document.querySelector("#todo-due-date");
    const priorityInput = document.querySelector("#todo-priority");

    todoForm.reset();

    if (todo) {
        modalTitle.textContent = "Edit Todo";
        todoIdInput.value = todo.id;
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dueDateInput.value = todo.dueDate;
        priorityInput.value = todo.priority;
    }
    else {
        modalTitle.textContent = "Add Todo";
        todoIdInput.value = "";
        priorityInput.value = "medium";
    }

    modal.classList.add("open");
}

function openProjectModal(project = null) {
    const modal = document.querySelector("#project-modal");
    const modalTitle = document.querySelector("#project-modal-title");
    const projectForm = document.querySelector("#project-form");

    const projectIdInput = document.querySelector("#project-id");
    const projectNameInput = document.querySelector("#project-name");

    projectForm.reset();

    if (project) {
        modalTitle.textContent = "Edit Project";
        projectIdInput.value = project.id;
        projectNameInput.value = project.name;
    }
    else {
        modalTitle.textContent = "Add Project";
        projectIdInput.value = "";
    }

    modal.classList.add("open");
}

function closeProjectModal() {
    const modal = document.querySelector("#project-modal");

    modal.classList.remove("open");
}

function closeTodoModal() {
    const modal = document.querySelector("#todo-modal");

    modal.classList.remove("open");
}

function setupEventListeners() {
    const addProjectButton = document.querySelector("#add-project-btn");
    const addTodoButton = document.querySelector("#add-todo-btn");
    const todoForm = document.querySelector("#todo-form");
    const cancelTodoButton = document.querySelector("#cancel-todo-btn");
    const projectForm = document.querySelector("#project-form");
    const cancelProjectButton = document.querySelector("#cancel-project-btn");

    addProjectButton.addEventListener("click", () => {
        openProjectModal();
    });

    addTodoButton.addEventListener("click", () => {
        openTodoModal();
    });

    cancelTodoButton.addEventListener("click", () => {
        closeTodoModal();
    });

    cancelProjectButton.addEventListener("click", () => {
        closeProjectModal();
    });

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const projectId = document.querySelector("#project-id").value;
        const projectName = document.querySelector("#project-name").value.trim();

        if (projectName === "") {
            return;
        }

        const ignoredProjectId = projectId || null;

        if (projectNameExists(projectName, ignoredProjectId)) {
            alert("A project with this name already exists.");
            return;
        }

        if (projectId) {
            editProject(projectId, projectName);
        }
        else {
            addProject(projectName);
        }

        closeProjectModal();

        render();
    });

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const todoId = document.querySelector("#todo-id").value;
        const title = document.querySelector("#todo-title").value.trim();
        const description = document.querySelector("#todo-description").value.trim();
        const dueDate = document.querySelector("#todo-due-date").value;
        const priority = document.querySelector("#todo-priority").value;

        if (title === "") {
            return;
        }

        if (todoId) {
            editTodo(todoId, {
                title,
                description,
                dueDate,
                priority
            });
        }
        else {
            addTodo(title, description, dueDate, priority);
        }

        closeTodoModal();

        render();
    });
}

export { render, setupEventListeners };