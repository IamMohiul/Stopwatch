const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const stopButton = document.getElementById('stopBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

let startTime;
let elapsedTime = 0;
let interval;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    startTime = performance.now() - elapsedTime;
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true;
}

function pauseTimer() {
    clearInterval(interval);
    startButton.disabled = false;
}

function stopTimer() {
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
}

function updateTimer() {
    const currentTime = performance.now();
    elapsedTime = currentTime - startTime;
    displaTimer();
}

function displaTimer() {
    const totalMilliseconds = Math.floor(elapsedTime);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    millisecondsLabel.textContent = padTime(totalMilliseconds % 1000);
    secondsLabel.textContent = padTime(totalSeconds % 60);
    minutesLabel.textContent = padTime(Math.floor(totalSeconds / 60));
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    elapsedTime = 0;
    displaTimer();
}

function addToLapList() {
    const lapTime = `${padTime(Math.floor(elapsedTime / 60000))}:${padTime(Math.floor((elapsedTime % 60000) / 1000))}.${padTime(Math.floor((elapsedTime % 1000) / 10))}`;
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span> Lap ${lapList.childElementCount + 1} : </span> ${lapTime}`;
    lapList.appendChild(listItem);
}
