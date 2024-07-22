const questions = [
  {
    question: "Where do accidentals go?",
    image: "",
    answers: [
      { text: "To the left (before)", correct: true},
      { text: "To the right (after)", correct: false},
      { text: "Underneath", correct: false},
      { text: "Above", correct: false},
    ]
  },
  {
    question: "Which Italian term mean gradually becoming slower? (Hint: there are two correct answers!)",
    image: "",
    answers: [
      { text: "adagio", correct: false},
      { text: "accelerando", correct: false},
      { text: "rallentando", correct: true},
      { text: "ritardando", correct: true},
    ]
  },
  {
    question: "Semitones in major scales fall between which scale degrees?",
    image: "",
    answers: [
      { text: "3-4 and 5-6", correct: false},
      { text: "3-4 and 7-8", correct: true},
      { text: "9-10 and 11-12", correct: false},
      { text: "2-3 and 3-4", correct: false},
    ]
  },
  {
    question: "Name this interval:",
    image: "images/Grade 2/L1/Q4.png",
    answers: [
      { text: "1st", correct: false},
      { text: "8ve", correct: true},
      { text: "8th", correct: false},
      { text: "9th", correct: false},
    ]
  },
  {
    question: "Name this sign:",
    image: "images/Grade 2/L1/Q5.png",
    answers: [
      { text: "Tie", correct: false},
      { text: "Slur", correct: true},
      { text: "Staccato", correct: false},
      { text: "Smooth phrase", correct: false},
    ]
  },
]

const questionElement = document.getElementById("question");
const questionImage = document.getElementById('question-image');
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("quiz-next-button");
const instructions = document.getElementById("quiz-instructions");
const instructionsNumberOfQuestions = document.getElementById("quiz-instructions-number-of-questions");

let currentQuestionIndex = -1;
let score = 0;

function beginQuizScreen() {
  resetState();
  nextButton.innerHTML = "Start Quiz";
  questionElement.innerHTML = "Instructions:";
  questionElement.style.padding = "0px";
  if (questions.length != 1) {
    instructionsNumberOfQuestions.innerHTML = "There are <b>" + questions.length + " questions</b> in this quiz.";
  } else {
    instructionsNumberOfQuestions.innerHTML = "There is <b>1 question</b> in this quiz.";
  }

  nextButton.style.display = "block";
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  instructions.style.display = "none";
  questionElement.style.padding = "0 0 5px 0";
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  questionImage.src = currentQuestion.image;
  questionImage.style.width = "100%";
  questionElement.style.textWrap = "wrap";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("quiz-answer-option-button");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  questionImage.src = "";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("quiz-correct");
    score++;
  } else {
    selectedBtn.classList.add("quiz-incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("quiz-correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Do Quiz Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex == -1) {
    startQuiz();
  }
  else if (currentQuestionIndex < questions.length) {
      handleNextButton();
  } else {
    startQuiz();
  }
});

beginQuizScreen();
