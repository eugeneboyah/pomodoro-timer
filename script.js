document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const pauseButton = document.getElementById('pause');
    const pomodoroButton = document.getElementById('pomodoro');
    const shortBreakButton = document.getElementById('shortBreak');
    const longBreakButton = document.getElementById('longBreak');

    let timer;
    let timeLeft;
    let isPaused = false;
    let currentInterval = 'pomodoro';

    const intervals = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    };

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    function switchInterval(interval) {
        currentInterval = interval;
        timeLeft = intervals[interval];
        updateDisplay();
        clearInterval(timer);
    }

    function startTimer() {
        if (isPaused) {
            isPaused = false;
        } else {
            switchInterval(currentInterval);
        }
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alert(`${currentInterval.replace(/([A-Z])/g, ' $1')} is over!`);
            }
        }, 1000);
    }

    function pauseTimer() {
        isPaused = true;
        clearInterval(timer);
    }

    function stopTimer() {
        clearInterval(timer);
        switchInterval(currentInterval);
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    stopButton.addEventListener('click', stopTimer);
    pomodoroButton.addEventListener('click', () => switchInterval('pomodoro'));
    shortBreakButton.addEventListener('click', () => switchInterval('shortBreak'));
    longBreakButton.addEventListener('click', () => switchInterval('longBreak'));

    switchInterval('pomodoro');  // Initialize the display with pomodoro interval
});
