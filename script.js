'use strict';

const generateRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const min = 1;
const max = 20;
let score = 20;
let highscore = 0;

let myNumber = generateRandomNumber(min, max);

const questionMarkElement = document.querySelector('.question-mark');
const guessInputElement = document.querySelector('.guess');
const resultElement = document.querySelector('.result');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');

guessInputElement.addEventListener('input', function (event) {
  this.value = this.value.replace(/[^0-9]/g, '');
});

checkButton.addEventListener('click', () => {
  const userInput = Number(guessInputElement.value);

  if (userInput >= min && userInput <= max && userInput === myNumber) {
    questionMarkElement.innerHTML = myNumber;
    resultElement.innerHTML = '🎉 Correct number!';
    document.body.style.backgroundColor = '#60b347';
    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }
  } else if (
    userInput >= min &&
    userInput <= max &&
    userInput !== myNumber &&
    userInput < myNumber
  ) {
    resultElement.innerHTML = '📉 Too low!';
    scoreElement.innerHTML = --score;
  } else if (
    userInput >= min &&
    userInput <= max &&
    userInput !== myNumber &&
    userInput > myNumber
  ) {
    resultElement.innerHTML = '📈 Too high!';
    scoreElement.innerHTML = --score;
  } else if (guessInputElement.value === '') {
    resultElement.innerHTML = '⛔ No entry!';
  } else {
    resultElement.innerHTML = '⛔ Not in range!';
  }
});

againButton.addEventListener('click', () => {
  myNumber = generateRandomNumber(min, max);
  score = 20;
  document.body.style.backgroundColor = '#222';
  questionMarkElement.innerHTML = '?';
  guessInputElement.value = '';
  resultElement.innerHTML = 'Start guessing...';
  scoreElement.innerHTML = '20';
});
