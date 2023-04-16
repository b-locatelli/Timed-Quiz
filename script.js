// my variables
var startButton = document.querySelector('#start-button');
var answerA = document.querySelector(".answerA")
var answerB = document.querySelector(".answerB")
var answerC = document.querySelector(".answerC")
var answerD = document.querySelector(".answerD")
var timerElement = document.querySelector(".timer-count")
var scoreElement = document.getElementById("score")
var timer;
var timerCount;
var currentQuestion= 0;
var score = 0;
var correctAnswer = 0;

// starts the quiz hides the begin screen
startButton.addEventListener("click", function(){
    document.querySelector("#quiz").setAttribute("class", "show")
    document.querySelector('.begin').setAttribute("class", "hide")
    startQuiz();
} )

var finishButton = document.querySelector('#finish');

// my array of questions and answers
var questions = [
    {
        question: "Wich is not a Javascript data type?",
        answers: ["A) Number", "B) Float", "C) Boolean", "D) String"],
        correctAnswer: "B) Float"
    },
    {
        question: "What does NaN Represent?",
        answers: ["A) Undefined", "B) Infinity", "C) Not a Number", "D) Null"],
        correctAnswer: "C) Not a Number"
    },
    {
        question: "What is the correct way to write a for loop?",
        answers: ["A) for(var i = 0; i > length; i++)", "B) for(var i = 0; i = length; i++)", "C) for(var i = 0; i > length; i+)", "D) for(var i = 0; i > length; i++)"],
        correctAnswer: "D) for(var i = 0; i > length; i++)"
    },
    {
        question: "How do you display a function?",
        answers: ["A) function startTimer()", "B) Function startTimer()", "C) var function startTimer()", "D) let function startTimer()"],
        correctAnswer: "A) function startTimer()"
    },
    {
        question: "How do you comment in JavaScript?",
        answers: ["A) #", "B) <!--comment-->", "C) //comment", "D) /*comment*/"],
        correctAnswer: "C) //comment"
    },
]

// function to start the timer when quiz is started and end at 0 seconds
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (isWin && timerCount > 0) {
          clearInterval(timer);
          winGame();
        }
      }
      if (timerCount <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
}

// function to start the quiz
function startQuiz() {
  isWin = false;
  timerCount = 40;
  startButton.disabled = true;
  startTimer()
}

// function to display question and answers
function displayQuestion() {
    var questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestion].question;
    var answerElements = document.getElementsByClassName("answer");
    for(var i = 0; i < answerElements.length; i++) {
        answerElements[i].textContent = questions[currentQuestion].answers[i]
    }
    if(currentQuestion === questions.length -0) {
      finishButton.disabled =false;
    } else {
      finishButton.disabled = true;
    }
    answerA.textContent = questions[currentQuestion].answers[0];
    answerB.textContent = questions[currentQuestion].answers[1];
    answerC.textContent = questions[currentQuestion].answers[2];
    answerD.textContent = questions[currentQuestion].answers[3];
}

// handles event listeners when page loads
window.onload = function(){
    displayQuestion();
    answerA.addEventListener("click", handleAnswerClick);
    answerB.addEventListener("click", handleAnswerClick);
    answerC.addEventListener("click", handleAnswerClick);
    answerD.addEventListener("click", handleAnswerClick);
    displayScore()
}

// updates correct score
function updateScore(points) {
    score += points;
    displayScore()
}
  
// displays score
function displayScore() {
    document.getElementById('score').textContent = "Score: " + score;
}
  
// checks if picked answer is correct or not
function checkAnswer(answer) {
    var selectedAnswer = answer;
    if(selectedAnswer === "A" || selectedAnswer === "B" || selectedAnswer === "C" || selectedAnswer === "D") {
    updateScore(1);
    }
 }  

//  tells what to do when correct or incorrct answer is picked
function handleAnswerClick(event){
    var selectedAnswer = event.target.textContent;
    var question = questions[currentQuestion];
    var correctAnswer = question.correctAnswer;
    if(selectedAnswer === correctAnswer) {
         console.log("Correct!")
         updateScore(1);
    } else {
         console.log("Incorrect!")
         timerCount -= 5;
         if(timerCount < 0) {
          timerCount = 0;
        }
      }
    currentQuestion++;
    if(currentQuestion < questions.length) {
         displayQuestion();
    } else {
        var quizSection = document.getElementById("quiz");
        quizSection.classList.add("hide");
        var endQuizSection = document.getElementById("end-quiz");
         endQuizSection.classList.remove("hide");
         scoreElement.textContent = "Score: " + score;
         displayScore()
  }
}

// handles sybmit form to display player names
document.getElementById('submitBtn').addEventListener("click", function(event) {
  event.preventDefault();
  var nameInput = document.getElementById('nameInput');
  var name = nameInput.value;
  if(name !=='') {
    var displayNames = document.getElementById('displayNames');
    var nameElement = document.createElement('p');
    nameElement.textContent = 'Name: ' + name;
    displayNames.appendChild(nameElement);
    nameInput.value = '';
  }
});

// ends the quiz when called after last question or when the time runs out
function endQuiz() {
  var quizSection = document.getElementById("quiz");
  quizSection.classList.add("hide");
  var endQuizSection = document.getElementById("end-quiz");
  endQuizSection.classList.remove("hide")
}
