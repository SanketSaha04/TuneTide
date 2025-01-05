console.log("Welcome to TuneTide");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songName = document.getElementById('songName');
let songCover = document.getElementById('songCover');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "Channa Mereya-Arijit Singh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ik Vari Aa-Arijit Singh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mitwaa- Shankar-Ehsan-Loy", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Jane Nahi Denge Tujhe-Sonu Nigam", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Abhi Mujh Mein kahin-Sonu Nigam", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Tere liye hum hai-Roopkumar", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Har ghadi badal rahi hai -Sonu Nigam", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Jo Tum Mere ho- Anuv Jain", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
];


const updateSongInfo = () => {
    songName.innerText = songs[songIndex].songName;
    songCover.src = songs[songIndex].coverPath;
    gif.style.opacity = 1;
};

const resetAllPlayButtons = () => {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updateSongInfo();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});


songItems.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
          
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0; 
        } else {
          
            resetAllPlayButtons();
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1; 
            updateSongInfo();
        }
    });
});



document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongInfo();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateSongInfo();
});
