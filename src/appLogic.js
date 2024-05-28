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