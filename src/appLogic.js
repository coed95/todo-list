import { isToday, isThisWeek, parseISO } from 'date-fns';

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
            this.todos.push(todo);
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
    home: Project("home", Home),
    today: Project("today", Today),
    week: Project("week", Week),

    addProject: function(name) {
        this[name] = Project(name);
    },

    deleteProject: function(name) {
        if (Object.keys(this).length > 3 && this.hasOwnProperty(name)) {
            delete this[name];
        }
    },
};