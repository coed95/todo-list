# Todo List

A Todo List web application built with JavaScript, HTML, CSS, Webpack, and localStorage.

This project was created as part of The Odin Project JavaScript curriculum. The main goal was to practice organizing application logic, separating DOM manipulation from data logic, using modules, and saving user data locally in the browser.

## Features

- Create, edit, select, and delete projects
- Create, edit, complete, and delete todos
- Store todos inside specific projects
- Display todo title, description, due date, priority, and completion status
- Use modal forms for adding and editing projects and todos
- Prevent duplicate project names
- Show an empty state when a project has no todos
- Save all data with localStorage
- Keep data available after refreshing the page
- Format due dates with date-fns
- Use priority labels for low, medium, and high priority todos
- Responsive-style layout with a sidebar and main content area

## Built With

- JavaScript
- HTML
- CSS
- Webpack
- date-fns
- localStorage

## Project Structure

```text
src/
  modules/
    app.js
    dom.js
    project.js
    storage.js
    todo.js
  index.js
  style.css
  template.html
```

## Main Concepts Practiced

This project focuses on several important JavaScript concepts:

- Factory functions for creating todo and project objects
- ES modules for separating code into different files
- Application state management
- DOM rendering based on data
- Event listeners for user interaction
- Form handling with modals
- localStorage for persistence
- JSON serialization and parsing
- Basic validation
- Webpack bundling

## How It Works

The application stores all projects and todos inside a central state object.

Each project contains:

```js
{
  id: "unique-project-id",
  name: "Project name",
  todos: []
}
```

Each todo contains:

```js
{
  id: "unique-todo-id",
  title: "Todo title",
  description: "Todo description",
  dueDate: "YYYY-MM-DD",
  priority: "medium",
  completed: false
}
```

The app state is saved to localStorage whenever the user changes the data. When the page loads, the app checks localStorage first. If saved data exists, it loads that data. If no saved data exists, it creates a default project.

## Modules

### todo.js

Creates todo objects.

### project.js

Creates project objects.

### app.js

Handles the main application state and data logic, including:

- Adding projects
- Editing projects
- Deleting projects
- Selecting projects
- Adding todos
- Editing todos
- Deleting todos
- Toggling todo completion
- Saving state after changes

### storage.js

Handles saving and loading data from localStorage.

### dom.js

Handles DOM rendering and user interaction, including:

- Rendering projects
- Rendering todos
- Opening and closing modals
- Handling form submissions
- Updating the UI after state changes

### index.js

Starts the app by initializing state, setting up event listeners, and rendering the interface.

## Installation

Clone the repository:

```bash
git clone git@github.com:coed95/todo-list.git
```

Move into the project folder:

```bash
cd todo-list
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## Usage

1. Open the app.
2. Use "+ Add Project" to create a new project.
3. Select a project from the sidebar.
4. Use "+ Add Todo" to create a todo inside the selected project.
5. Edit todos with the edit button.
6. Mark todos as completed with the checkbox.
7. Delete todos or projects when needed.
8. Refresh the page and the saved data will remain available.

## What I Learned

While building this project, I practiced separating application logic from DOM logic. Instead of directly tying data changes to the interface, I used app-level functions to update state, then re-rendered the UI from that state.

I also learned how localStorage works with JSON. Since localStorage only stores strings, the app needs to convert the state object into a string with `JSON.stringify()` and convert it back with `JSON.parse()` when loading.

Another important part of the project was learning how to use modal forms instead of browser prompts. This made the interface cleaner and gave me more control over form inputs, validation, and styling.

## Future Improvements

Possible future improvements include:

- Add filtering by completed and active todos
- Add sorting by due date or priority
- Add an "All Todos" view
- Add a "Today" view
- Add drag-and-drop ordering
- Improve responsive design for small screens
- Add custom delete confirmation modals
- Add project icons or colors

## Acknowledgments

This project was built as part of The Odin Project JavaScript curriculum.