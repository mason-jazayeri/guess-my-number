'use strict';

const min = 1;
const max = 20;
let score = 20;
let highscore = 0;

const questionMarkElement = document.querySelector('.question-mark');
const guessInputElement = document.querySelector('.guess');
const resultElement = document.querySelector('.result');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');

const displayMessage = message => (resultElement.textContent = message);

const generateRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

let myNumber = generateRandomNumber(min, max);

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
    displayMessage('😞 You lost!');
    document.body.style.backgroundColor = '#ff0000';
  } else {
    if (userInput === myNumber) {
      questionMarkElement.textContent = myNumber;
      displayMessage('🎉 Correct number!');
      // Changing the style of an element: Method 1 with style property
      // Changing the style of an element: Method 2 by defining a new class in css and changing the class of the element
      document.body.style.backgroundColor = '#60b347';
      if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
      }
    } else {
      if (userInput >= min && userInput <= max) {
        displayMessage(userInput < myNumber ? '📉 Too low!' : '📈 Too high!');
        // Note the difference between --score and score--
        scoreElement.textContent = --score;
        // focus() method for focusing on input element
        guessInputElement.focus();
      } else {
        if (guessInputElement.value === '') {
          displayMessage('⛔ No entry!');
          guessInputElement.focus();
        } else {
          displayMessage('⛔ Not in range!');
          guessInputElement.focus();
        }
      }
    }
  }
});

againButton.addEventListener('click', () => {
  myNumber = generateRandomNumber(min, max);
  score = 20;
  document.body.style.backgroundColor = '#222';
  questionMarkElement.textContent = '?';
  guessInputElement.value = '';
  guessInputElement.focus();
  displayMessage('Start guessing...');
  scoreElement.textContent = '20';
});

// BUG: When the score meets 0, it doesn't immediately get red.
