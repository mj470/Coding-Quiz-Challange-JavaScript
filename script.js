

var questions = [
{
    title: "What does HTML stand for?",
    choices: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
    answers: "Hyper Text Marketing Language",
},

{
    title: "Which of the following is not a commonly used data type?",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
    
},

{
    titel: "String valuse must be enclosed witin what when assigned to a variable?",
    choices: ["Curly Brakets", "Quotes", "Parenthesis", "Square Brakets"],
    answer: "Quotes",
},

{
    titel: "What does DOM stand for?",
    choices: ["Document Object Model", "Document Over Motion", "Drop Object Move", "Data on Manual"],
    answer: "Document Object Model",
},

{
    title: "Arrays in Javascript can be used to store what?",
    choices: ["Numbers and Strings", "Booleans", "Other Arrays", "All of the Above"],
    answer: "All of the Above",

},
];

// Variables //


var containerBannertEl = document.getElementById("outer-container");
var containerScoreEl = document.getElementById("top-bar");
var containerFirstScreenEl = document.getElementById("inner-container");
var containerQuestionEl = document.getElementById("question-screen");
var containerIntroEl = document.getElementById("quiz-intro");
var containterQuestionEl = document.getElementById("question-screen");
var containerFinishEl = document.getElementById("quiz-finish-screen");
var containerHighScoresEl = docmunet.getElementById("highscores-screen");
var ViewHighScoresEl = document.getElementById("highscores-screen");
var listHighScoreEl = document.getElementById("high-score-list");
var formInitials = document.getElementById("initials-form")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong");


// buttons //

var btnStartEl = document.querySelector("#start-quiz");
var btnViewHighscoresEl = document.querySelector("#view-highscores");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearEl = document.querySelector("#clear-high-scores");

// questons elements //

var questionsEL = document.getElementById("questions");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timeEL = document.querySelector("#timer");
var score = 0;
var timeleft;
var quizend 
timerEl.innerText = 0;



// High Score //

var HighScores =[];

var arrayShuffledQuestions 
var QuestionIndex = 0

// go back button on high score page //
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerFirstScreenEl.classList.remove("hide")
    containerFirstScreenEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    quizend = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }

}



// timer in quiz //

var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (quizend) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

var startGame = function() {
    containerIntroEl.classList.add("hide");
    containerIntroEl.classList.remove("show");
    containterQuestionEl.classList.remove("hide");
    containterQuestionEl.classList.add("show");

    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

// remove answer buttons //

var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

// Questions info and answer buttons //

var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
        }
    };


// correct and wrong answer displays //
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
        }
    } 
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }    
    
// is answer correct? moving to next question //

var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
            answerCorrect()
            score = score + 7
        }

        else {
          answerWrong()
          score = score - 1;
          timeleft = timeleft - 3;
      };

      
      QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         quizend = "true";
         showScore();
          }
}

// display score at end of quiz //

var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerFinishEl.classList.remove("hide");
    containerFinishEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
} 

// high scores //

var createHighScore = function(event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials!");
      return;
    }

  formInitials.reset();

  var HighScore = {
  initials: initials,
  score: score
  } 

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {return b.score-a.score});

  // clear list //
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
 }

 // order elements in high scores //
 for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

    saveHighScore();
    displayHighScores();

  } 

  // save high score function //
  var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
        
}

//load values //
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);
        
    }
}  

// display high scores when initials are entered //
var displayHighScores = function() {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerFinishEl.className = "show") {
        containerFinishEl.classList.remove("show");
        containerFinishEl.classList.add("hide");
        }
    if (containerFirstScreenEl.className = "show") {
        containerFirstScreenEl.classList.remove("show");
        containerFirstScreenEl.classList.add("hide");
        }
        
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
        }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
        }
    
}

// clear high scores //
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);

} 

loadHighScore()
    
  //on start click, start game
  btnStartEl.addEventListener("click", startGame)
  //on submit button -- enter or click
  formInitials.addEventListener("submit", createHighScore)
  //when view high-scores is clicked
  ViewHighScoresEl.addEventListener("click", displayHighScores)
  //Go back button
  btnGoBackEl.addEventListener("click", renderStartPage)
  //clear scores button
  clearScores.addEventListener("click", clearScores)







