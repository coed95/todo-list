const STORAGE_KEY = "todo-list-data";

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
        return null;
    }

    return JSON.parse(savedData);
}

export { saveState, loadState };