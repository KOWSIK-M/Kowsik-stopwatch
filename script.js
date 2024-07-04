let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const downloadButton = document.getElementById('download');
const lapsContainer = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00.00";
    difference = 0;
    running = false;
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        laps.push(display.innerHTML);
        updateLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);

    display.innerHTML = 
        (hours > 9 ? hours : "0" + hours) + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}

function downloadLaps() {
    if (laps.length === 0) {
        alert("No laps to download.");
        return;
    }

    let lapText = laps.map((lap, index) => `Lap ${index + 1}: ${lap}`).join('\n');
    let blob = new Blob([lapText], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'laps.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
downloadButton.addEventListener('click', downloadLaps);
