var startButton = document.querySelector(".start-button");


var questions = [	{		question: "What is the capital of France?",		answer: "Paris"	},	{		question: "Who invented the telephone?",		answer: "Alexander Graham Bell"	},	{		question: "What is the largest planet in our solar system?",		answer: "Jupiter"	}];


//when 'start' button clicked run this function
function startQuiz ();







// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);