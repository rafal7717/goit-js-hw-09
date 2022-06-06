const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");
startBtn.addEventListener("click", changeColor);
let timerId = null;
function changeColor(event) {
    function changeBodyColor() {
        body.style.backgroundColor = randomColor();
    };
    timerId = setInterval(changeBodyColor, 1000);
    startBtn.disabled = true;
};
stopBtn.addEventListener("click", stopChanging);
function stopChanging() {
    clearInterval(timerId);
    startBtn.disabled = false;
};

const randomColor = function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};