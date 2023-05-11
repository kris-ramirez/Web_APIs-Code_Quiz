var question = document.querySelector('#question');
var choices = document.querySelectorAll('.answertext');
var scoreText = document.querySelector('#score');
var timer1 = document.querySelector('#timer');
var saveButton = document.querySelector('#saveBtn');

//declration variables
var currentQuestion = {};
var score = 0;
var questioncounter = 0;
var correctanswers = true;
var allquestions = [];
var timeLeft = 1000;
var maxquestions = 5;
var timerInterval;
//questions and answers to be generated on page
var questions = [
    {
        question: 'Commonly used data types DO Not include:',
        choiceA: 'strings',
        choiceB: 'booleans',
        choiceC: 'alerts',
        choiceD: 'numbers',
        answer: 'C',
    },
    {
        question: 'The condition in an if/else statment is enclosed with _________.',
        choiceA: 'quotes',
        choiceB: 'curly brackets',
        choiceC: 'parenthesis',
        choiceD: 'square brackets',
        answer: 'B',
    },
    {
        question: 'Arrays in JavaScript can be used to store ___________.',
        choiceA: 'numbers and strings',
        choiceB: 'other arrays',
        choiceC: 'booleans',
        choiceD: 'all of the above',
        answer: 'D',
    },
    {
        question: 'String values must be enclosed within __________ when being assigned to variables.',
        choiceA: 'commas',
        choiceB: 'curly brackets',
        choiceC: 'quotes',
        choiceD: 'paranthesis',
        answer: 'C',
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is: ',
        choiceA: 'JavaScript',
        choiceB: 'terminal/bash',
        choiceC: 'console.log',
        choiceD: 'for loops',
        answer: 'C',
    },]
//how many points to increment by when user gets correct answer
var startPoints = 1000;
//when 'start' button clicked run this function
startQuiz = () => {
    questioncounter = 0;
    points = 0;
    allquestions = [...questions];
    getNextQuestion();
}


function getNextQuestion() {
    if (allquestions.length === 0) {
        localStorage.setItem('highscore', points)
        document.getElementById('flood').style.display = "none";
        document.getElementById('dry').style.display = 'block';
        clearInterval(timerInterval);
    } else {
        questioncounter++;
        //grabs a random question from array
        var qindex = Math.floor(Math.random() * allquestions.length);
        currentQuestion = allquestions[qindex];
        //shows question 
        question.innerText = currentQuestion.question;

        //shows answer choices
        choices.forEach(choice => {
            var letter = choice.dataset['letter']
            choice.innerText = currentQuestion['choice' + letter];
            choice.addEventListener('click', answerSelected);
            choice.classList.remove('incorrect', 'correct');
        });

        allquestions.splice(qindex, 1);
        correctanswers = true;

    }
}

//what happens when answers are clicked on
function answerSelected(e) {
    if (!correctanswers) {
        return;
    }

    correctanswers = false;
    var selected = e.target;
    var clickedAnswer = selected.dataset['letter'];

    var classToApply = clickedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
        incrementPoints(startPoints);
    } else {
        //decreases time when wrong answer is selected
        timeLeft -= 100;
    }

    selected.classList.add(classToApply);

    choices.forEach(choice => {
        if (choice.dataset['letter'] == currentQuestion.answer) {
            choice.classList.add('correct');
        }
    });

    setTimeout(getNextQuestion, 1000);

}

//increments the score and displays it on the page
function incrementPoints(num) {
    points += num;
    scoreText.innerText = points;

}
//timer function 
function setTime() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timer1.textContent = timeLeft + ' seconds left';

        if (timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
setTime();


//when user hits save button their name and score appear on the page
saveButton.addEventListener('click', function (event) {
    event.preventDefault();

    var userName = document.querySelector("#userName").value;
    var highScore = scoreText.textContent;
    var userInfo = document.querySelector("#user-info");

    userInfo.innerHTML = "Name: " + userName + " - " + highScore;
    userInfo.setAttribute('id', "userInfo");

    //create try again btn
    var goBack = document.createElement("button");
    goBack.innerHTML = "Try Again"
    document.body.appendChild(goBack);
    goBack.setAttribute('id', 'startAgain');

    goBack.addEventListener("click", function () {
        location.reload();
    });
});


startQuiz();

