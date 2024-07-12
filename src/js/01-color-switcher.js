const refs = {
  stratBtn: document.querySelector('.js-start-button'),
  stopBtn: document.querySelector('.js-stop-button'),
};

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBodyBgColor() {
  document.querySelector('body').style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick(e) {
  refs.stratBtn.disabled = true;
  intervalId = setInterval(changeBodyBgColor, 1000);
}

function onStopBtnClick(e) {
  refs.stratBtn.disabled = false;
  clearInterval(intervalId);
  document.querySelector('body').style.backgroundColor = 'white';
}

refs.stratBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
