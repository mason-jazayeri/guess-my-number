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

// input event:
// It fires immediately every time user makes a change in input value.
// replace method:
// replace method on value of input replaces the first argument with the second.
guessInputElement.addEventListener('input', function (event) {
  this.value = this.value.replace(/[^0-9]/g, '');
});

checkButton.addEventListener('click', () => {
  const userInput = Number(guessInputElement.value);
  if (score === 0) {
    resultElement.innerHTML = '😞 You lost!';
    document.body.style.backgroundColor = '#ff0000';
  } else if (
    userInput >= min &&
    userInput <= max &&
    userInput === myNumber &&
    score !== 0
  ) {
    questionMarkElement.innerHTML = myNumber;
    resultElement.innerHTML = '🎉 Correct number!';
    // Changing the style of an element: Method 1 with style property
    // Changing the style of an element: Method 2 by defining a new class in css and changing the class of the element
    document.body.style.backgroundColor = '#60b347';
    if (score > highscore) {
      highscore = score;
      highscoreElement.textContent = highscore;
    }
  } else if (
    userInput >= min &&
    userInput <= max &&
    userInput < myNumber &&
    score !== 0
  ) {
    resultElement.innerHTML = '📉 Too low!';
    // Note the difference between --score and score--
    scoreElement.innerHTML = --score;
    guessInputElement.focus();
  } else if (
    userInput >= min &&
    userInput <= max &&
    userInput !== myNumber &&
    userInput > myNumber &&
    score !== 0
  ) {
    resultElement.innerHTML = '📈 Too high!';
    scoreElement.innerHTML = --score;
    // focus() method for focusing on input element
    guessInputElement.focus();
  } else if (guessInputElement.value === '' && score !== 0) {
    resultElement.innerHTML = '⛔ No entry!';
    guessInputElement.focus();
  } else {
    resultElement.innerHTML = '⛔ Not in range!';
    guessInputElement.focus();
  }
});

againButton.addEventListener('click', () => {
  myNumber = generateRandomNumber(min, max);
  score = 20;
  document.body.style.backgroundColor = '#222';
  questionMarkElement.innerHTML = '?';
  guessInputElement.value = '';
  guessInputElement.focus();
  resultElement.innerHTML = 'Start guessing...';
  scoreElement.innerHTML = '20';
});

// BUG: When the score meets 0, it doesn't immediately get red.
