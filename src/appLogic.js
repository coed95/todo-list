export function Todo(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };
}

export function Project(name) {
    return {
        name: name,
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