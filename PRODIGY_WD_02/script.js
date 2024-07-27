let timer;
let startTime; 
let pausedTime = 0;
let lapTimes = []; 
const initialStartTime = 30 * 60 * 1000;

function startStop() {
    let startStopButton = document.getElementById("startStopButton");
    if (startStopButton.textContent === "Start") {
        startStopButton.textContent = "Stop";
        startTime = Date.now() - pausedTime;
        timer = setInterval(updateDisplay, 10);
    } else {
        startStopButton.textContent = "Start";
        clearInterval(timer);
        pausedTime = Date.now() - startTime;
    }
}

function lap() {
    let displayTime = document.getElementById("display").textContent;
    if (lapTimes.length < 3) {
        lapTimes.push(displayTime);
    } else {
        lapTimes.shift();
        lapTimes.push(displayTime);
    }
    updateLapDisplay();
}

function reset() {
    clearInterval(timer);
    pausedTime = 0;
    lapTimes = [];
    document.getElementById("startStopButton").textContent = "Start";
    document.getElementById("display").textContent = formatTime(initialStartTime);
    updateLapDisplay();
}

function updateDisplay() {
    let currentTime = Date.now();
    let elapsedTime = new Date(currentTime - startTime + initialStartTime);
    let minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
    let seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
    let milliseconds = elapsedTime.getMilliseconds().toString().padStart(3, "0");
    document.getElementById("display").textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function formatTime(timeInMilliseconds) {
    let elapsedTime = new Date(timeInMilliseconds);
    let minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
    let seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
    let milliseconds = elapsedTime.getMilliseconds().toString().padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateLapDisplay() {
    let lapList = document.getElementById("lapList");
    lapList.innerHTML = ""; // Clear previous laps
    for (let i = 0; i < lapTimes.length; i++) {
        let lapItem = document.createElement("li");
        lapItem.textContent = lapTimes[i];
        lapList.appendChild(lapItem);
    }
}

// Initial setup on page load
document.getElementById("display").textContent = formatTime(initialStartTime);
