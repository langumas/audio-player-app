// Seleccionamos los divs de la rueda
const menuBtn = document.querySelector('.menu');        // Abrir archivo
const playPauseBtn = document.querySelector('.bottom'); // Play/Pause
const timeDisplay = document.getElementById('time');

let audio = new Audio();
let isPlaying = false;

menuBtn.addEventListener('click', async () => {
    console.log('MENU clicked'); 
    const filePath = await window.electronAPI.openFile();
    if (filePath) {
        audio.src = filePath;
        audio.load();
        timeDisplay.textContent = '00:00 / 00:00';
    }
});


playPauseBtn.addEventListener('click', () => {
    console.log('PLAY/PAUSE clicked'); // 
    if (!audio.src) return; 

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
});

audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.style.color = '#f3aecd';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.style.color = '#f3aecd';
});


audio.addEventListener('timeupdate', () => {
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = `${current} / ${duration}`;
});


function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
