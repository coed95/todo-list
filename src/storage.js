import { Project, Projects } from "../src/appLogic.js";

export function saveProjects(projects) {
    const projectsCopy = {};

    for (const key in projects) {
        if (projects.hasOwnProperty(key) && typeof projects[key] === "object") {
            projectsCopy[key] = {
                name: projects[key].name,
                image: projects[key].image,

                todos: projects[key].todos.map(todo => ({
                    title: todo.title,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                    completed: todo.completed,
                })),
            };
        }
    }

    localStorage.setItem("projects", JSON.stringify(projectsCopy));
}

export function loadProjects() {
    const projectsData = localStorage.getItem("projects");

    if (projectsData) {
        const parsedProjects = JSON.parse(projectsData);

        for (const key in parsedProjects) {
            if (parsedProjects.hasOwnProperty(key)) {
                const projectData = parsedProjects[key];
                const project = Project(projectData.name, projectData.image);

                projectData.todos.forEach(todoData => {
                    const todo = Todo(
                        todoData.title,
                        todoData.dueDate,
                        todoData.priority
                    );
                    todo.completed = todoData.completed;

                    project.addTodo(todo);
                });

                Projects[key] = project;
            }
        }
    }
}

export function deleteProject(projectName) {
    if (Projects.hasOwnProperty(projectName)) {
        delete Projects[projectName];
        saveProjectsToLocalStorage(Projects);
    }
    else {
        console.log("Project not found.");
    }
}

export function deleteTask(projectName, taskTitle) {
    if (Projects.hasOwnProperty(projectName)) {
        const project = Projects[projectName];
        const taskIndex = project.todos.findIndex(todo => todo.title === taskTitle);
        
        if (taskIndex !== -1) {
            project.todos.splice(taskIndex, 1);
            saveProjectsToLocalStorage(Projects);
        }
        else {
            console.log("Task not found.");
        }
    }
    else {
        console.log("Project not found.");
    }
}