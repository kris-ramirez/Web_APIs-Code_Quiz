var question = document.querySelector('#question');
var choices = document.querySelectorAll('.answertext');
var scoreText = document.querySelector('#score');
var timer1 = document.querySelector('#timer');

var currentQuestion = {};
var score = 0;
var questioncounter = 0;
var correctanswers = true;
var allquestions = [];
var timeLeft = 1000;
var maxquestions = 5;
var timerInterval;

var questions = [
    {
        question: 'Commonly used data types DO Not include:',
        choiceA: 'A. strings',
        choiceB: 'B. booleans',
        choiceC: 'C. alerts',
        choiceD: 'D. numbers',
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
    }, ]

var startPoints = 100; 
//when 'start' button clicked run this function
startQuiz = () => {
    questioncounter = 0;
    points = 0;
    allquestions = [...questions];
    getNextQuestion();
}

function getNextQuestion () {
    if (allquestions.length === 0 || questioncounter > maxquestions) {
        localStorage.setItem('mostrecentscore', points)
        document.getElementById('flood').style.display="none";
        document.getElementById('dry').style.display='block';
        clearInterval(timerInterval);
        //return window.location.assign("end.html")
    }
    questioncounter++;
    //grabs a random question from array
    var qindex = Math.floor(Math.random() * allquestions.length);
    currentQuestion = allquestions[qindex];
    //shows question in html inner is better than textContent 
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

//what happens when answers are clicked on
function answerSelected (e) {
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
        timeLeft -= 10;
    }

    selected.classList.add(classToApply);

    choices.forEach(choice => {
        if (choice.dataset['letter'] == currentQuestion.answer) {
            choice.classList.add('correct');
        setTimeout(() => {
        },3000)
        }

    });

    setTimeout(getNextQuestion, 1000);

}


function incrementPoints (num) {
    points += num;
    scoreText.innerText = points;
}

function setTime() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timer1.textContent = timeLeft + ' seconds left';

        if(timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
setTime();
startQuiz();

//Take user to high scores page
