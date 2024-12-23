const image = document.getElementById('cover'),
artist = document.getElementById('music-artist');
title = document.getElementById('music-title'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/images/music/instrinna-не_верю(prod. by BORIS REDWALL, Joviee).mp3',
        displayName: 'Не верю',
        cover: 'assets/images/instarinna.jpg',
        artist: 'instarinna',
    },
    {
        path: 'assets/images/music/ICYTWAT-Eyez_on_Em.mp3',
        displayName: 'Eyez On Em',
        cover: 'assets/images/img-1.jpg',
        artist: 'ICYTWAT',
    },
    {
        path: 'assets/images/music/Asenssia,VSN7-Приворот.mp3',
        displayName: 'Приворот',
        cover: 'assets/images/privorot.jpg',
        artist: 'Asenssia,VSN7',
    },
    {
        path: 'assets/images/music/VELIAL SQUAD - Изба.mp3',
        displayName: 'Изба',
        cover: 'assets/images/velialsquad.jpg',
        artist: 'VELIAL SQUAD',
    },
]


music.onerror = () => console.error('Ошибка загрузки файла:', music.src);
image.onerror = () => console.error('Ошибка загрузки обложки:', image.src);
background.onerror = () => console.error('Ошибка загрузки фона:', background.src);

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Изменение кнопки проигрователя
    playBtn.classList.replace('fa-play', 'fa-pause');

    playBtn.setAttribute('title', 'pause');
    music.play()
}

function pauseMusic(){
    isPlaying = false;
    // Изменение кнопки проигрователя
    playBtn.classList.replace('fa-pause','fa-play');

    playBtn.setAttribute('title', 'play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length)  %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).
    padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', ()=> changeMusic(-1));
nextBtn.addEventListener('click', ()=> changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);


loadMusic(songs[musicIndex]);