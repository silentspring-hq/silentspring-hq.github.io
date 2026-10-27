const tracks = [
  { title: "dairy", url: "music/dairy.mp3" },
  { title: "abi", url: "music/abi.mp3" },
  { title: "what_i_would_give", url: "music/what_i_would_give.mp3" },
  { title: "flower_boy", url: "music/flower_boy.mp3" },
  { title: "replace_me", url: "music/replace_me.mp3" },
  { title: "flares", url: "music/flares.mp3" },
  { title: "crescent", url: "music/crescent.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('album-player');
const nextButton = document.getElementById('next-track');
const prevButton = document.getElementById('prev-track');
const playPauseButton = document.getElementById('play-pause');
const trackTitle = document.getElementById('current-track-title');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function loadTrack(index) {
  currentTrackIndex = index;
  audioPlayer.src = tracks[index].url;
  trackTitle.textContent = `Playing: ${tracks[index].title}`;
  
  seekBar.value = 0;
  seekBar.max = 0;
  currentTimeDisplay.textContent = "0:00";
  durationDisplay.textContent = "0:00";
}

function playTrack() {
  audioPlayer.play().then(() => {
    isPlaying = true;
    playPauseButton.textContent = "⏸️";
  }).catch(err => {
    console.error("Playback failed:", err);
  });
}

function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseButton.textContent = "▶️";
}

function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

audioPlayer.addEventListener('timeupdate', () => {
  const current = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  
  if (!isNaN(duration)) {
    seekBar.max = duration;
    seekBar.value = current;
    durationDisplay.textContent = formatTime(duration);
  }
  currentTimeDisplay.textContent = formatTime(current);
});

audioPlayer.addEventListener('loadedmetadata', () => {
  seekBar.max = audioPlayer.duration;
  durationDisplay.textContent = formatTime(audioPlayer.duration);
});

seekBar.addEventListener('input', () => {
  audioPlayer.currentTime = seekBar.value;
});

audioPlayer.addEventListener('ended', () => {
  nextTrack();
});

playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);

loadTrack(0);
playPauseButton.textContent = "▶️";