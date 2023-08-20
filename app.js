const score = document.querySelector('.score');
const userInput = document.querySelector('#word');
const startBtn = document.querySelector('.start-btn');
const currState = document.querySelector('.current-state');
const timeRemaining = document.querySelector('.seconds');

startBtn.addEventListener('click', start);
userInput.addEventListener('input', play);

async function start(e) {
  e.preventDefault();
  currState.textContent = await getWord();
  userInput.disabled = false;
  startBtn.disabled = true;
  timer();
}

async function play(e) {
  const value = e.target.value;
  const result = value === currState.textContent;

  if (result) {
    score.textContent = Number(score.textContent) + 10;
    currState.textContent = await getWord();
    e.target.value = '';
  }
}

function timer() {
  let seconds = 100;

  const interval = setInterval(() => {
    timeRemaining.textContent = seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      resetGame();
    }
  }, 1000);
}

function resetGame() {
  userInput.disabled = true;
  startBtn.disabled = false;

  currState.textContent = `Final score: ${score.textContent}`;
}

async function getWord() {
  try {
    const response = await fetch('https://random-words-api.vercel.app/word/');
    const data = await response.json();
    const { word } = data[0];

    return word.toLowerCase();
  } catch (error) {
    console.log(error);
  }
}