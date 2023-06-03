import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_LOCALSTORAGE_TIME = "videoplayer-current-time";

player.on('timeupdate',
  throttle(ontimeUpdateValue, 1000));

function ontimeUpdateValue(data) {
  localStorage.setItem(KEY_LOCALSTORAGE_TIME, data.seconds)
};

function currentTime() {
  const timeUpdate = localStorage.getItem(KEY_LOCALSTORAGE_TIME);
  if (timeUpdate) {
    player.setCurrentTime(timeUpdate);
  }
};

currentTime();