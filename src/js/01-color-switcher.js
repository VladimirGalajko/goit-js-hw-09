const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', checkButton);
btnStop.addEventListener('click', checkButton);
btnStop.disabled = true;

let id = '';
function checkButton(e) {
  if (e.srcElement.textContent === 'Start') {
    btnStop.disabled = false;
    btnStart.disabled = true;

    id = setInterval(() => {
      let color = getRandomHexColor();
      document.body.style.backgroundColor = color;
    }, 1000);

    let color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }
  if (e.srcElement.textContent === 'Stop') {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearTimeout(id);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}


