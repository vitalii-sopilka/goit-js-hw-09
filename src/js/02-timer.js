import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputTimer = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const outputDays = document.querySelector('span[data-days]');
const outputHours = document.querySelector('span[data-hours]');
const outputMinutes = document.querySelector('span[data-minutes]');
const outputSeconds = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');

timer.style.marginTop = '20px';
timer.style.display = 'grid';
timer.style.gridTemplateColumns = '50px 50px 70px 70px';
timer.style.textAlign = 'center';
timer.style.justifyContent = 'center';

let timerId = null;

btnStart.addEventListener('click', onTimerStart); 

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notiflix.Notify.failure(
        "Please choose a date in the future",
        {
          timeout: 3000,
        },
      );
    }
    else {
      btnStart.disabled = false;
    }
  }
}

const fp = flatpickr(inputTimer, options); 

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  outputDays.textContent = days;
  outputHours.textContent = hours;
  outputMinutes.textContent = minutes;
  outputSeconds.textContent = seconds;
}

function updateTimer() {
  btnStart.disabled = true;

  const deltaTime = new Date(inputTimer.value) - Date.now();
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  updateTimerDisplay(addLeadingZero(days), addLeadingZero(hours), addLeadingZero(minutes), addLeadingZero(seconds));

  if (deltaTime < 1000) {
    clearInterval(timerId);
    Notiflix.Notify.info('Account ended!', {
      timeout: 2000,
    });
  }
}

function onTimerStart (){
  timerId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}