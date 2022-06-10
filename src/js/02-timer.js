import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Import of Notiflix library
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startBtn = document.querySelector('button[data-start');
const datePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days');
const dataHours = document.querySelector('[data-hours');
const dataMinutes = document.querySelector('[data-minutes');
const dataSeconds = document.querySelector('[data-seconds');

startBtn.disabled = true;

let counterDown;

// flatpickr library
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      clearInterval(counterDown);
      dataDays.innerHTML = '00';
      dataHours.innerHTML = '00';
      dataMinutes.innerHTML = '00';
      dataSeconds.innerHTML = '00';
    }
  },
});

function convertMs(ms) {
  counterDown = setInterval(() => {
    const currentDate = new Date().getTime();

    const datePickerMs = new Date(
      datePicker.value.replace(/-/g, '/')
    ).getTime();
    ms = datePickerMs - currentDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    //add leading zero
    const addLeadingZero = value => value.toString().padStart(2, '0');
    dataDays.innerHTML = addLeadingZero(days);
    dataHours.innerHTML = addLeadingZero(hours);
    dataMinutes.innerHTML = addLeadingZero(minutes);
    dataSeconds.innerHTML = addLeadingZero(seconds);

    startBtn.disabled = true;

    if (ms <= 0) {
      clearInterval(counterDown);
      dataDays.innerHTML = '00';
      dataHours.innerHTML = '00';
      dataMinutes.innerHTML = '00';
      dataSeconds.innerHTML = '00';
    }
  }, 1000);
}

startBtn.addEventListener('click', convertMs);
