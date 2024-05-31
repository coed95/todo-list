import Home from "../src/img/home.svg";
import Today from "../src/img/today.svg";
import Week from "../src/img/week.svg";

export function Todo(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };
}

export function Project(name, defaultImage = "../src/img/list.svg") {
    return {
        name: name,
        image: defaultImage,
        todos: [],

        addTodo: function(todo) {
            const existingTodo = this.todos.findIndex(existing => existing.title === todo.title);

            if (existingTodo !== -1) {
                console.log("Todo with the same title already exists");
            }
            else {
                this.todos.push(todo);
            }
        },

        editTodo: function(index, todo) {
            if (index >= 0 && index < this.todos.length) {
                this.todos[index] = todo;
            }
            else {
                console.log("Error: invalid length");
            }
        },

        deleteTodo: function(index) {
            if (index >= 0 && index < this.todos.length) {
                this.todos.splice(index, 1);
            }
            else {
                console.log("Error: invalid length");
            }
        },
    };
}

export const Projects = {
    Home: Project("Home", Home),
    Today: Project("Today", Today),
    Week: Project("Week", Week),
    Test: Project("Test"),
    Test2: Project("Test 2"),
    Test3: Project("Test 3"),

    addProject: function(name) {
        if (this.hasOwnProperty(name)) {
            alert(`Project "${name}" already exists.`);
        }
        else if (name === "") {
            alert("Project name cannot be empty");
        }
        else {
            this[name] = Project(name);
        }
    },

    deleteProject: function(name) {
        if (Object.keys(this).length > 3 && this.hasOwnProperty(name)) {
            delete this[name];
        }
    },
};