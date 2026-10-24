const questions = [
    {
        question: "Which language structures a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correctAnswer: "HTML"
    },
    {
        question: "Which language styles a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correctAnswer: "CSS"
    },
    {
        question: "Which language adds behavior to a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correctAnswer: "JavaScript"
    }
];

const questionNumber = document.querySelector("#questionNumber");
const questionDisplay = document.querySelector("#question");
const answerButtons = document.querySelector("#answerButtons");
const feedback = document.querySelector("#feedback");
const scoreDisplay = document.querySelector("#score");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const quizProgress = document.querySelector("#quizProgress");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;
    feedback.textContent = "";
    nextButton.disabled = true;

    nextButton.hidden = false;
    restartButton.hidden = true;

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        "Question " + (currentQuestionIndex + 1) +
        " of " + questions.length;

    questionDisplay.textContent = currentQuestion.question;

    answerButtons.textContent = "";

    currentQuestion.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function () {
            checkAnswer(answer, button);
        });

        answerButtons.appendChild(button);
    });

    quizProgress.max = questions.length;
    quizProgress.value = currentQuestionIndex;
}

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    quizProgress.value = currentQuestionIndex + 1;

    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score = score + 1;
        feedback.textContent = "Correct! Well done!";
        selectedButton.classList.add("correct");
    } else {
        feedback.textContent =
            "Incorrect. The correct answer is " +
            currentQuestion.correctAnswer + ".";

        selectedButton.classList.add("incorrect");
    }

    const allButtons = answerButtons.querySelectorAll("button");

    allButtons.forEach(function (answerButton) {
        if (answerButton.textContent === currentQuestion.correctAnswer) {
            answerButton.classList.add("correct");
        }

        answerButton.disabled = true;
    });

    scoreDisplay.textContent = "Score: " + score;
    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1;
        showQuestion();
    } else {
        questionNumber.textContent = "Quiz complete!";

        const percentage = Math.round(
            (score / questions.length) * 100
        );

        questionDisplay.textContent =
            "You scored " + score + " out of " + questions.length +
            " (" + percentage + "%).";

        answerButtons.textContent = "";

        if (percentage === 100) {
            feedback.textContent =
                "Excellent! You got every question correct!";
        } else if (percentage >= 60) {
            feedback.textContent =
                "Good job! Keep practicing to improve.";
        } else {
            feedback.textContent =
                "Keep learning! Try the quiz again.";
        }

        quizProgress.value = quizProgress.max;

        nextButton.hidden = true;
        restartButton.hidden = false;
    }
});

restartButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    scoreDisplay.textContent = "Score: 0";
    quizProgress.value = 0;

    showQuestion();
});

showQuestion();