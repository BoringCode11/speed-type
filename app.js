const startBtn = document.querySelector('.start-btn');
const currState = document.querySelector('.current-state');
const score = document.querySelector('.score');
const userInput = document.querySelector('#word');

startBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  currState.textContent = await getWord();
  score.textContent = 0;
  startBtn.disabled = true;
})

userInput.addEventListener('input', async (e) => {
  const value = e.target.value;

  if (value === currState.textContent) {
    const currScore = Number(score.textContent)
    score.textContent = currScore + 10;

    currState.textContent = await getWord();
    e.target.value = '';
  }
})

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