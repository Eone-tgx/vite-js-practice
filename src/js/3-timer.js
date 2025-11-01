import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.stopBtn.disabled = true;
updateTimerDisplay(0, 0, 0, 0);

let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Alert',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
      });
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.datePicker, options);

function startTimer() {
  refs.startBtn.disabled = true;
  refs.datePicker.disabled = true;
  refs.stopBtn.disabled = false;

  iziToast.success({
    title: 'Success',
    message: 'Countdown is started',
    timeout: 2000,
    position: 'topRight',
  });

  countdownInterval = setInterval(() => {
    const currentTime = Date.now();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      refs.startBtn.disabled = true;
      refs.datePicker.disabled = false;
      refs.stopBtn.disabled = true;

      iziToast.success({
        title: 'Success',
        message: 'Countdown is over',
        timeout: 2000,
        position: 'topRight',
      });

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function stopTimer() {
  iziToast.info({
    message: 'Timer is stopped',
    timeout: 2000,
    position: 'topRight',
  });
  clearInterval(countdownInterval);
  updateTimerDisplay(0, 0, 0, 0);
  refs.startBtn.disabled = false;
  refs.datePicker.disabled = false;
  refs.stopBtn.disabled = true;
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.outputDays.textContent = addLeadingZero(days);
  refs.outputHours.textContent = addLeadingZero(hours);
  refs.outputMinutes.textContent = addLeadingZero(minutes);
  refs.outputSeconds.textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

refs.startBtn.addEventListener('click', startTimer);
refs.stopBtn.addEventListener('click', stopTimer);
