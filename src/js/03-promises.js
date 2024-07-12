import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('.js-submit'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onSubmit(e) {
  let delayTime = Number(refs.delay.value);
  let promiseCounter = 1;
  e.preventDefault();
  for (let i = 0; i < Number(refs.amount.value); i++) {
    if (i == 0) {
      createPromise(promiseCounter, Number(refs.delay.value))
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✔ promise ${position} sucesfully done in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❗ promise ${position} rejected in ${delay}ms`
          );
        });
    } else {
      delayTime += Number(refs.step.value);
      createPromise(promiseCounter, delayTime)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✔ promise ${position} sucesfully done in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❗ promise ${position} rejected in ${delay}ms`
          );
        });
    }
    promiseCounter++;
  }
}

refs.form.addEventListener('submit', onSubmit);
