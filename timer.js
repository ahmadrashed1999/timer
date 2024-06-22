let startTime;
let timerInterval;
let running = false;

function startTimer() {
    if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        const elapsedTime = Date.now() - startTime;
        saveTime(elapsedTime);
        displayResults();
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = '00:00:00.000';
    document.getElementById('results').innerHTML = '';
    localStorage.removeItem('results');
    running = false;
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    document.getElementById('timer').innerText =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    let s = '000' + num;
    return s.substr(s.length - size);
}

function saveTime(time) {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({ time, timestamp: new Date().toISOString() });
    localStorage.setItem('results', JSON.stringify(results));
}

function displayResults() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Results</h2>';
    results.forEach((result, index) => {
        resultsDiv.innerHTML += `<p>${index + 1}: ${formatTime(result.time)}</p>`;
    });
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

// عرض النتائج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayResults);
