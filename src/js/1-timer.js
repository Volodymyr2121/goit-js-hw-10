import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;
const startBtn = document.querySelector("[data-start]")
const countdownTimer = document.querySelector(".timer");
const daysValue = countdownTimer.querySelector("[data-days]");
const hoursValue = countdownTimer.querySelector("[data-hours]");
const minutesValue = countdownTimer.querySelector("[data-minutes]");
const secondValue = countdownTimer.querySelector("[data-seconds]");
const input = document.querySelector("#datetime-picker");


startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        // console.log(selectedDates[0]);
        if (userSelectedDate < new Date()) {
            iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
});
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        };
    },
    
};


flatpickr("#datetime-picker", options);

let countDown;
function startCoundown(choiceTime) {
    countDown = setInterval(() => {
        const timeLeft = choiceTime.getTime() - Date.now();
        if (timeLeft <= 0) {
            clearInterval(countDown);
            updateTime(0);
            startBtn.disabled = false
                input.disabled = false;
        } else {
            updateTime(timeLeft);
        };
    })
};

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

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTime(timeLeft) {
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondValue.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
    startCoundown(userSelectedDate);
    startBtn.disabled = true;
    input.disabled = true;
})