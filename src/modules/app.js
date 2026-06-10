import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { saveState, loadState } from "./storage.js";

const state = {
    projects: [],
    selectedProjectId: null,
};

function initApp() {
    const savedState = loadState();

    if (savedState) {
        state.projects = savedState.projects;
        state.selectedProjectId = savedState.selectedProjectId;

        return;
    }

    const defaultProject = createProject("Default Project");

    state.projects.push(defaultProject);
    state.selectedProjectId = defaultProject.id;

    saveState(state);
}

function projectNameExists(name, ignoredProjectId = null) {
    return state.projects.some((project) => {
        const isSameName = project.name.toLowerCase() === name.toLowerCase();
        const isIgnoredProject = project.id === ignoredProjectId;

        return isSameName && !isIgnoredProject;
    });
}

function getSelectedProject() {
    return state.projects.find((project) => project.id === state.selectedProjectId);
}

function addTodo(title, description, dueDate, priority) {
    const selectedProject = getSelectedProject();

    if (!selectedProject) {
        return;
    }

    const todo = createTodo(title, description, dueDate, priority);

    selectedProject.todos.push(todo);

    saveState(state);
}

function addProject(name) {
    if (!name || name.trim() === "") {
        return;
    }

    if (projectNameExists(name)) {
        return;
    }

    const project = createProject(name.trim());

    state.projects.push(project);
    state.selectedProjectId = project.id;

    saveState(state);
}

function selectProject(projectId) {
    const projectExists = state.projects.some((project) => project.id === projectId);

    if (!projectExists) {
        return;
    }

    state.selectedProjectId = projectId;

    saveState(state);
}

function deleteTodo(todoId) {
    const selectedProject = getSelectedProject();

    if (!selectedProject) {
        return;
    }

    selectedProject.todos = selectedProject.todos.filter((todo) => todo.id !== todoId);

    saveState(state);
}

function toggleTodoCompleted(todoId) {
    const selectedProject = getSelectedProject();

    if (!selectedProject) {
        return;
    }

    const todo = selectedProject.todos.find((todo) => todo.id === todoId);

    if (!todo) {
        return;
    }

    todo.completed = !todo.completed;

    saveState(state);
}

function deleteProject(projectId) {
    if (state.projects.length === 1) {
        return;
    }

    state.projects = state.projects.filter((project) => project.id !== projectId);

    if (state.selectedProjectId === projectId) {
        state.selectedProjectId = state.projects[0].id;
    }

    saveState(state);
}

function editTodo(todoId, updatedTodo) {
    const selectedProject = getSelectedProject();

    if (!selectedProject) {
        return;
    }

    const todo = selectedProject.todos.find((todo) => todo.id === todoId);

    if (!todo) {
        return;
    }

    todo.title = updatedTodo.title;
    todo.description = updatedTodo.description;
    todo.dueDate = updatedTodo.dueDate;
    todo.priority = updatedTodo.priority;

    saveState(state);
}

function editProject(projectId, newName) {
    const trimmedName = newName.trim();

    if (!trimmedName || projectNameExists(trimmedName, projectId)) {
        return;
    }

    const project = state.projects.find((project) => project.id === projectId);

    if (!project) {
        return;
    }

    project.name = trimmedName;

    saveState(state);
}

export {
    state,
    initApp,
    getSelectedProject,
    addTodo,
    addProject,
    selectProject,
    deleteTodo,
    toggleTodoCompleted,
    deleteProject,
    editTodo,
    editProject,
    projectNameExists,
};