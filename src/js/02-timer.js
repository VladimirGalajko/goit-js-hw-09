import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const btnStart = document.querySelector('[data-start]');
btnStart.addEventListener('click', checkButton);
btnStart.disabled = true;

const selector = document.getElementById('datetime-picker');
let selectedTime = null;

const timerRefs = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.warning('Please choose a date in the future', {
        className: 'notify-warning',
        width: '300px',
        position: 'left-top',
        warning: { background: '#ff827e' },
      });

      selectedDates[0] = new Date();
    } else {
      btnStart.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

flatpickr(selector, options);

function checkButton() {
  const id = setInterval(() => {
    const now = new Date().getTime();
    const timeDiff = selectedTime - now;

    if (timeDiff <= 0) {
      clearInterval(id);
    } else {
      const times = convertMs(timeDiff);
      const setTimes = addLeadingZero(times);
      let { dataDays, dataHours, dataMinutes, dataSeconds } = timerRefs;
      let { days, hours, minutes, seconds } = setTimes;
      dataDays.textContent = days;
      dataHours.textContent = hours;
      dataMinutes.textContent = minutes;
      dataSeconds.textContent = seconds;
    }
  }, 1000);
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


function addLeadingZero({ days, hours, minutes, seconds }) {
  if (minutes <= 9) {
    minutes = minutes.toString().padStart(2, '0');
  }
  if (seconds <= 9) {
    seconds = seconds.toString().padStart(2, '0');
  }
  if (hours <= 9) {
    hours = hours.toString().padStart(2, '0');
  }
  if (days <= 9) {
    days = days.toString().padStart(2, '0');
  }
  return { days, hours, minutes, seconds };
}
