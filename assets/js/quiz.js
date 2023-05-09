var startButton = document.querySelector(".start-button");
var question = Array.from(document.querySelector('.question'));
var choices = document.querySelectorAll('.answers div');
var score = document.querySelector('#score');
var timer1 = document.querySelector('#timer');

var currentQuestion = {};
var score;
var questioncounter = 0;
var correctanswers = true;
var allquestions = [];
var timeLeft = 100;
var maxquestions = 5;

var questions = [
    {
        question: 'Commonly used data types DO Not include:',
        choices: ['A. strings', 'B. booleans', 'C. alerts', 'D. numbers'],
        answer: 'alerts'
    },
    {
        question: 'The condition in an if/else statment is enclosed with _________.',
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 'curly brackets'
    },
    {
        question: 'Arrays in JavaScript can be used to store ___________.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        question: 'String values must be enclosed within __________ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'paranthesis'],
        answer: 'quotes'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is: ',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log'
    },
]

//when 'start' button clicked run this function
function startQuiz() {
    score = 0;
    allquestions = [...questions]
    getNextQuestion();
}

function getNextQuestion() {
    if(questioncounter >= maxquestions) {
        endQuiz(); 
    }
    //grabs a random question from array
    var qindex = Math.floor(Math.random() * allquestions.length);
    var currentQuestion = allquestions[qindex];
    //shows question in html inner is better than textContent b/c 
    question.innerText = currentQuestion.question;
    //shows answer choices
    choices.forEach((choice, qindex) => {
    choice.innerText = currentQuestion.choices[qindex];
    });
    questioncounter++;
    correctanswers = true;
    
}
//what happens when answers are clicked on
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        correctanswers = false;
        var selected = e.target;
        var clickedAnswer = selected.textContent;
        
        var classToApply = clickedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selected.classList.add(classToApply);
    })

})
//Take user to high scores page
function endQuiz () {

}




// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);