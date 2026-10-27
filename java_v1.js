const tracks = [
  {
    title: "dairy",
    url: "music/dairy.mp3"
  },
  {
    title: "abi",
    url: "music/abi.mp3"
  },
  {
    title: "what_i_would_give",
    url: "music/what_i_would_give.mp3"
  },
  {
    title: "flower_boy",
    url: "music/flower_boy.mp3"
  },
  {
    title: "replace_me",
    url: "music/replace_me.mp3"
  },
  {
    title: "flares",
    url: "music/flares.mp3"
  },
  {
    title: "crescent",
    url: "music/crescent.mp3"
  }
];

let currentTrackIndex = 0;

const audioPlayer = document.getElementById('album-player');
const skipButton = document.getElementById('next-track');
const trackTitle = document.getElementById('current-track-title');

function loadAndPlayTrack(index) {
  audioPlayer.src = tracks[index].url;
  trackTitle.textContent = `Playing: ${tracks[index].title}`;
  audioPlayer.play();
}

skipButton.addEventListener('click', () => {
  // Advance index, loop back to 0 if at the end of playlist
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadAndPlayTrack(currentTrackIndex);
});

audioPlayer.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadAndPlayTrack(currentTrackIndex);
});

loadAndPlayTrack(0);