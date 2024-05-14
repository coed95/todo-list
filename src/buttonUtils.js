export function handleButtonClick(button) {
    if (button.classList.contains("active")) {
        return;
    }
    setActiveNavButton(button);
}

export function setActiveNavButton(button) {
    const buttons = document.querySelectorAll(".button-nav");

    buttons.forEach((button) => {
        if (button !== this) {
            button.classList.remove("active");
        }
    });

    button.classList.add("active");
}