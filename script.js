const play = document.querySelector('.fa-play')
const musicBox = document.querySelector('.music-box')
const forward = document.querySelector('.fa-forward')
const backward = document.querySelector('.fa-backward')
const record = document.getElementById('record')
const volumeBtn = document.getElementById("volumeBtn")
const lengthBtn = document.getElementById('length')
const audio = document.getElementById('audio')
const blurredBg = document.getElementById('blurred-bg')

// Music Array
let musicNames = ['cartoons on and on', 'cartoons why we', 'different heaven', 'disfigure blank', 'electrolight', 'electronomia', 'invincible', 'jani', 'lost sky', 'warriyo mortals']

let index = 2;


// Load Song First
loadSong(index)
let isPlaying = false;
play.addEventListener('click', onMusic)
backward.addEventListener('click', backwardMusic)
forward.addEventListener('click', forwardMusic)

function loadSong(i) {
  audio.src = `Music/${musicNames[i]}.mp3`
  record.src = `Thumbnail/${musicNames[i]}.png`
  blurredBg.src = `Thumbnail/${musicNames[i]}.png`
  addingRemovingEvent();
  setTitle(i)
  audio.onloadedmetadata = () => {
    lengthSetReset()
  }
}


// TITLE SETTER
function setTitle(i) {
  document.getElementById('title').innerHTML = musicNames[i];
}

function onMusic() {
  if (isPlaying == false) {
    playMusic()
  }
  else if (isPlaying == true) {
    pauseMusic()
  }
}

// PLAY | PAUSE MUSIC
function playMusic() {
  audio.play();
  play.classList.replace('fa-play', 'fa-pause')
  musicBox.classList.add('play')
  isPlaying = true
}

function pauseMusic() {
  audio.pause();
  play.classList.replace('fa-pause', 'fa-play')
  musicBox.classList.remove('play')
  isPlaying = false
}


// FORWARD | BACKWARD MUSIC
function forwardMusic() {
  index++
  // console.log(index);
  backward.addEventListener('click', backwardMusic)
  backward.classList.remove('disabled')
  attributeSetter(index)
  playMusic()
  addingRemovingEvent()
  setTitle(index)
  audio.onloadedmetadata = () => {
    lengthSetReset()
  }
}

function backwardMusic() {
  index--
  // console.log(index);
  forward.addEventListener('click', forwardMusic)
  forward.classList.remove('disabled')
  attributeSetter(index)
  playMusic()
  addingRemovingEvent()
  setTitle(index)
  audio.onloadedmetadata = () => {
    lengthSetReset()
  }
}

// ATTRIBUTE SETTER
function attributeSetter(i) {
  audio.src = `Music/${musicNames[i]}.mp3`
  record.src = `Thumbnail/${musicNames[i]}.png`
  blurredBg.src = `Thumbnail/${musicNames[i]}.png`
}



// INDEX CHECKER
function addingRemovingEvent() {
  if (index == 0) {
    backward.classList.add('disabled')
    backward.removeEventListener('click', backwardMusic)
    forward.addEventListener('click', forwardMusic)

  } else if (index == musicNames.length - 1) {
    forward.classList.add('disabled')
    forward.removeEventListener('click', forwardMusic)
    backward.addEventListener('click', backwardMusic)
  }
}

audio.addEventListener('timeupdate', progressUpdate)
function progressUpdate() {
  lengthBtn.value = Math.floor(audio.currentTime);
  if (audio.currentTime == audio.duration) {
    forwardMusic()
  }
}

lengthBtn.addEventListener('change', changeLength)
// lengthBtn.addEventListener('mousemove', changeLength)
function changeLength() {
  audio.currentTime = lengthBtn.value
  progressUpdate()
}

function lengthSetReset() {
  lengthBtn.value = 0
  lengthBtn.max = Math.floor(audio.duration)
}

// VOLUME CHANGER
audio.volume = volumeBtn.value / 10;
volumeBtn.addEventListener('change', changeVolume)
volumeBtn.addEventListener('mousemove', changeVolume)
function changeVolume() {
  audio.volume = this.value / 10
}



