const questions = [
    {
        question: "Which character worked as a chef at Monica's restaurant?",
        options: ["Joey", "Monica", "Chandler", "Rachel"],
        answer: 1
    },
    {
        question: "What is Joey's famous catchphrase?",
        options: ["'How you doin'?'", "'Could I BE any cooler?'", "'Oh my God!'", "'We were on a break!'"],
        answer: 0
    },
    {
        question: "What was the name of Ross's pet monkey?",
        options: ["Marcel", "Chi-Chi", "Smelly Cat", "Hugsy"],
        answer: 0
    },
    {
        question: "What is Chandler's middle name?",
        options: ["Muriel", "Eustace", "Francis", "Bing"],
        answer: 0
    },
    {
        question: "How many times did Ross get divorced?",
        options: ["1 time", "2 times", "3 times", "4 times"],
        answer: 2
    },
    {
        question: "What instrument does Phoebe play?",
        options: ["Violin", "Piano", "Guitar", "Flute"],
        answer: 2
    },
    {
        question: "What is the name of Joey's bedtime penguin pal?",
        options: ["Hugsy", "Waddles", "Snowy", "Pengu"],
        answer: 0
    }
];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer = null;
let timeLeft = 15;

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const questionCount = document.getElementById("question-count");
const progressFill = document.getElementById("progress-fill");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("final-score");
const scoreMsg = document.getElementById("score-msg");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    welcomeScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetQuestionState();
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = currentQ.question;
    questionCount.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    let progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressFill.style.width = progressPercent + "%";

    currentQ.options.forEach((optionText, index) => {
        const btn = document.createElement("button");
        btn.innerText = optionText;
        btn.classList.add("option-btn");
        
        btn.addEventListener("click", function() {
            selectOption(btn, index);
        });

        optionsList.appendChild(btn);
    });

    startTimer();
}

function selectOption(btn, index) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedAnswer = index;
    nextBtn.disabled = false;
}
function startTimer() {
    timeLeft = 15;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    timer = setInterval(function() {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextQuestion();
        }
    }, 1000);
}
function goToNextQuestion() {
    clearInterval(timer);
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}
function resetQuestionState() {
    clearInterval(timer);
    selectedAnswer = null;
    nextBtn.disabled = true;
    optionsList.innerHTML = "";
}
function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.innerText = `${score}/${questions.length}`;

    if (score === questions.length) {
        scoreMsg.innerText = "Perfect score! You're a true Friends fan!";
    } else if (score >= 4) {
        scoreMsg.innerText = "Good job! You know your Friends trivia.";
    } else {
        scoreMsg.innerText = "Better luck next time! Time for a rewatch.";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}