import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const timer = document.body.querySelector(".timer");
const field = document.body.querySelectorAll(".field");
const startBtn = document.body.querySelector("[data-start]");
const label = document.body.querySelectorAll(".label");
const myInput = document.querySelector("#datetime-picker");
const daysCounter = document.querySelector("[data-days]");
const hoursCounter = document.body.querySelector("[data-hours]");
const minutesCounter = document.querySelector("[data-minutes]");
const secondsCounter = document.querySelector("[data-seconds]");



startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
          Notiflix.Notify.failure("Please choose a date in the future");
          startBtn.disabled = true;
          return
      }
      else {
            startBtn.disabled = false;
            const startDate = selectedDates[0].getTime();
            let ms = startDate - options.defaultDate.getTime();
            let sec = ms/1000;

            startBtn.addEventListener("click", startCounting);
          function startCounting() {
              startBtn.disabled = true;
              let timerId = null;
              function count() {
                  sec = sec - 1;
                  ms = sec * 1000;
                        if (sec <= 0) {
                            ms = 0;
                            Notiflix.Notify.success('The end');
                            clearInterval(timerId);
                        };
                    let days = convertMs(ms).days;
                    let hours = convertMs(ms).hours;
                    let minutes = convertMs(ms).minutes;
                    let seconds = convertMs(ms).seconds;

                    daysCounter.textContent = addLeadingZero(days);
                    hoursCounter.textContent = addLeadingZero(hours);
                    minutesCounter.textContent = addLeadingZero(minutes);
                    secondsCounter.textContent = addLeadingZero(seconds);
                    let remainingTime = {days,hours,minutes,seconds}
                    console.log(remainingTime);
                };
              timerId = setInterval(count, 1000);
            };
        }
  },
};
const fp = flatpickr(myInput,options);  // flatpickr



function convertMs(ms) {
    // Number of milliseconds per unit of time
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
    // console.log(seconds, minutes, hours, days);
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    if (value<10) {
        value = value.toString().padStart(2,"0");
        };
    return value;
}