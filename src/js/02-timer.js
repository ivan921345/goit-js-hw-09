import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timerIn: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('.js-start-btn'),
  days: document.querySelector('.js-days'),
  hours: document.querySelector('.js-hours'),
  minutes: document.querySelector('.js-mins'),
  seconds: document.querySelector('.js-seconds'),
};

const INTERVAL = 1000;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    const chosenDate = new Date(selectedDates[0]);
    if (chosenDate.getTime() < nowDate.getTime()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please select date from the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

function pad(value) {
  if (value.toString().length === 1) {
    return `0${value}`;
  } else {
    return value;
  }
}

function onStartBtnClick() {
  const selectedDate = new Date(refs.timerIn.value);
  timerId = setInterval(() => {
    updateTimer(selectedDate);
  }, INTERVAL);
}

function updateUI({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function updateTimer(selectedDate) {
  const now = new Date();
  const timeDifference = selectedDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.success('Time is up');
    return;
  }

  const time = convertMs(timeDifference);
  updateUI(time);
}

refs.startBtn.addEventListener('click', onStartBtnClick);

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

flatpickr('#datetime-picker', options);
