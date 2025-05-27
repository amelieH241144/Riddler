//AmelieH241144
//window.alert("I am linked");


//list of Riddels

var riddles = [
  { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo", answered: false },
  { question: "The more of me you take, the more you leave behind. What am I?", answer: "footsteps", answered: false },
  { question: "What has to be broken before you can use it?", answer: "egg", answered: false },
  { question: "I’m tall when I’m young, short when I’m old. What am I?", answer: "candle", answered: false },
  { question: "What can travel around the world while staying in the same corner?", answer: "stamp", answered: false },
  { question: "What has hands but can’t clap?", answer: "clock", answered: false },
  { question: "I’m found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?", answer: "yarn", answered: false },
  { question: "What begins with T, ends with T, and has T in it?", answer: "teapot", answered: false },
  { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m", answered: false },
  { question: "The more you take from me, the bigger I become. What am I?", answer: "hole", answered: false },
  { question: "I have branches, but no fruit, trunk or leaves. What am I?", answer: "bank", answered: false }

];

var currentRiddleIndex = 0;
var score = 0;
var gameArea = document.getElementById('gameArea');
var inputRow = document.getElementById('inputRow');
var startBtn = document.getElementById('startBtn');
var answeredRiddles = [];

//Start button
startBtn.addEventListener('click', function () {
  var username = document.getElementById('username').value;
  if (!username) {
    alert('Please enter your name.');
    return;
  }

  inputRow.classList.add('hidden');
  gameArea.classList.remove('hidden');

  greetUser(username);
  showRiddle();
});

//greeting users
function greetUser(name) {
  var greeting = document.createElement('p');
  greeting.id = 'greeting';
  greeting.textContent = "Hello, " + name + "! Let's play!";
  gameArea.appendChild(greeting);
}


//The Game area
function showRiddle() {
  
  var greeting = document.getElementById('greeting');
gameArea.innerHTML = '';


if (greeting) {
  gameArea.appendChild(greeting);
}
  
  //Score function
  if (score >=1000) {
    var winText = document.createElement('p');
    winText.textContent = "You win! Final Score: " + score;
    gameArea.appendChild(winText);

    var restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart Game';
    restartBtn.id = 'restartBtn';
    gameArea.appendChild(restartBtn);

    restartBtn.addEventListener('click', function () {
      currentRiddleIndex = 0;
      score = 0;
      answeredRiddles = [];

      inputRow.classList.remove('hidden');
      gameArea.classList.add('hidden');
      gameArea.innerHTML = '';
      document.getElementById('username').value = '';
    });

    return; 
  }

  var riddleObj = riddles[currentRiddleIndex % riddles.length];

  var questionP = document.createElement('p');
  questionP.textContent = riddleObj.question;

  var answerInput = document.createElement('input');
  answerInput.type = 'text';
  answerInput.id = 'answerBox';
  answerInput.placeholder = 'Your answer';

  var submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit Answer';
  submitBtn.id = 'submitBtn';

  var skipBtn = document.createElement('button');
  skipBtn.textContent = 'Skip';
  skipBtn.id = 'skipBtn';

  var prevBtn = document.createElement('button');
  prevBtn.textContent = 'Go to Previous';
  prevBtn.id = 'prevBtn';

  var feedback = document.createElement('p');
  feedback.id = 'feedback';

  var scoreP = document.createElement('p');
  scoreP.id = 'scoreDisplay';
  scoreP.textContent = "Score: " + score;

  gameArea.appendChild(questionP);
  gameArea.appendChild(answerInput);
  gameArea.appendChild(submitBtn);
  gameArea.appendChild(skipBtn);
  gameArea.appendChild(prevBtn);
  gameArea.appendChild(feedback);
  gameArea.appendChild(scoreP);

  if (answeredRiddles.includes(currentRiddleIndex)) {
    answerInput.disabled = true;
    submitBtn.disabled = true;
    feedback.textContent = 'Already answered!';
    feedback.style.color = 'blue';
  }

  submitBtn.addEventListener('click', function () {
    var answer = document.getElementById('answerBox').value.toLowerCase();

    if (answeredRiddles.includes(currentRiddleIndex)) {
      feedback.textContent = 'Already answered!';
      feedback.style.color = 'blue';
      return;
    }

    if (answer === riddleObj.answer.toLowerCase()) {
      score += 100;
      feedback.textContent = 'Correct! +100 points';
      feedback.style.color = 'green';

      answeredRiddles.push(currentRiddleIndex);
      currentRiddleIndex++;
      setTimeout(showRiddle, 1000);
    } else {
      feedback.textContent = 'Incorrect! Try again or skip.';
      feedback.style.color = 'red';
    }
  });

  skipBtn.addEventListener('click', function () {
    currentRiddleIndex++;
    showRiddle();
  });

  prevBtn.addEventListener('click', function () {
    if (currentRiddleIndex > 0) {
      currentRiddleIndex--;
      showRiddle();
    } else {
      feedback.textContent = 'No previous riddle available.';
      feedback.style.color = 'orange';
    }
  });
}
