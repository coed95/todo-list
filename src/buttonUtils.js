export function handleButtonClick(button) {
    if (button.classList.contains("active")) {
        return;
    }
    setActiveButton(button);
}

export function setActiveButton(button) {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        if (button !== this) {
            button.classList.remove("active");
        }
    });

    button.classList.add("active");
}