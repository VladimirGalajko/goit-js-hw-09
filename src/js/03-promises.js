import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');
form.addEventListener('input', checkInput);
form.addEventListener('submit', checkSubmit);


let delay = null
let step = null
let amount = null
function checkInput(e) {
  delay = Number(e.currentTarget.delay.value);
  step = Number(e.currentTarget.step.value);
  amount = Number(e.currentTarget.amount.value);
}

function checkSubmit(e) {
  e.preventDefault();
  startShow(amount);
}

function startShow(amount) {
  for (let position = 1; amount >= position; position++) { 
    createPromise(position, delay)
      .then(obj => fulfill(obj))
      .catch(obj => reject(obj))
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function fulfill({ position, delay }) {
  setTimeout(() => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }, delay);
}

function reject({position, delay}){
  setTimeout(() => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }, delay);
}