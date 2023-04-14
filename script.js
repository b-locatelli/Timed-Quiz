var startButton = document.querySelector('#start-button');
var correctAnswer = document.getElementById("correctAnswer")
var answerA = document.querySelector(".answerA")
var answerB = document.querySelector(".answerB")
var answerC = document.querySelector(".answerC")
var answerD = document.querySelector(".answerD")
var timerElement = document.querySelector(".timer-count")
var scorElement = document.getElementById("score")
var timer;
var timerCount;
var currentQuestion= 0;
var score = 0;


startButton.addEventListener("click", function(){
    document.querySelector("#start-button").setAttribute("class", "hide")
    document.querySelector("#quiz").setAttribute("class", "")
    startQuiz();
} )

startButton.addEventListener("click", function(){
    document.querySelector("#quiz").setAttribute("class", "show")
    document.querySelector('.begin').setAttribute("class", "hide")
} )

var finishButton = document.querySelector('#finish');

finishButton.addEventListener("click", function(){
    document.querySelector('#finish').setAttribute('class', 'hide')
    document.querySelector('#end-quiz').setAttribute('class', "")
})

finishButton.addEventListener("click", function(){
    document.querySelector('#end-quiz').setAttribute('class', "show")
    document.querySelector('#quiz').setAttribute('class', 'hide')
})

function getElementById(name) {
    var username = document.getElementById("name")
    document.write(username);
}

var questions = [
    {
        question: "Im not sure what to put yet?",
        answers: ["A) Im not sure", "B) Im not sure", "C) Im not sure", "D) Im not sure"],
        correctAnswer: "B"
    },
    {
        question: "Im not sure what to put yet?",
        answers: ["A) awdad", "B) wdqadawd", "C) Im not sure", "D) Im not sure"],
        correctAnswer: "B"
    },
    {
        question: "Im not sure what to put yet?",
        answers: ["A) Im not sure", "B) Im not sure", "C) Im not sure", "D) Im not sure"],
        correctAnswer: "B"
    },
    {
        question: " Im not sure what to put yet?",
        answers: ["A) Im not sure", "B) Im not sure", "C) awdad", "D) Im not sure"],
        correctAnswer: "B"
    },
    {
        question: "Im not sure what to put yet?",
        answers: ["A) Im not sure", "B) Im not sure", "C) Im not sure", "D) Im not sure"],
        correctAnswer: "B"
    },
]

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
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

  function startQuiz() {
    isWin = false;
    timerCount = 100;
    startButton.disabled = true;
    startTimer()
  }

  function displayQuestion() {
    var questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestion].question;
    var answerElements = document.getElementsByClassName("answer");
    for(var i = 0; i < answerElements.length; i++) {
        answerElements[i].textContent = questions[currentQuestion].answers[i]
    }
    answerA.textContent = questions[currentQuestion].answers[0];
    answerB.textContent = questions[currentQuestion].answers[1];
    answerC.textContent = questions[currentQuestion].answers[2];
    answerD.textContent = questions[currentQuestion].answers[3];
  }

  window.onload = function(){
    displayQuestion()
    answerA.addEventListener("click", handleAnswerClick);
    answerB.addEventListener("click", handleAnswerClick);
    answerC.addEventListener("click", handleAnswerClick);
    answerD.addEventListener("click", handleAnswerClick);
  }

  function handleAnswerClick(event){
    var selectedAnswer = event.target.textContent;
    var correctAnswer = questions[currentQuestion].correctAnswer;
    if(selectedAnswer === correctAnswer) {
         console.log("Correct!")
         score ++;
    } else {
         console.log("Incorrect!")
      }
    currentQuestion++;
    if(currentQuestion < questions.length) {
         displayQuestion();
    } else {
        var quizSection = document.getElementById("quiz");
        quizSection.classList.add("hide");
        var endQuizSection = document.getElementById("end-quiz");
         endQuizSection.classList.remove("hide");
         scorElement.textContent = "Score: " + score;
  }
}
