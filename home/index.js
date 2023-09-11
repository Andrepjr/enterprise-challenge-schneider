const quizData = [
    {
      question: "Ao fazer compras, você utiliza a sacola plástica do mercado?",
      options: ["Sempre", "Às vezes", "Nunca"],
      answer: 2
    },
    {
      question: "Ao escovar os dentes, você mantém a torneira:",
      options: ["Aberta", "Fechada"],
      answer: 1
    },
    {
      question: "Em média, seu banho dura:",
      options: ["De 3 a 5 minutos", "De 5 a 10 minutos", "Mais de 10 minutos"],
      answer: 0
    },
    {
        question: "Você realiza coleta seletiva?",
        options: ["Sempre", "Às vezes", "Nunca"],
        answer: 0
    },
    {
        question: "Qual desses meios de transporte você utiliza com mais frequência?",
        options: ["Público (ônibus/trem/metro)", "Privado (carro/moto)", "Bicicleta"],
        answer: 2
    }
  ];
  
let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');

function loadQuestion() {
const currentQuizData = quizData[currentQuestion];
questionElement.innerText = currentQuizData.question;

optionsElement.innerHTML = '';
for (let i = 0; i < currentQuizData.options.length; i++) {
    const option = document.createElement('button');
    option.innerText = currentQuizData.options[i];
    option.setAttribute('onclick', 'selectAnswer(' + i + ')');
    optionsElement.appendChild(option);
}}

function selectAnswer(option) {
const currentQuizData = quizData[currentQuestion];
if (option === currentQuizData.answer) {
    score++;
}

currentQuestion++;

if (currentQuestion < quizData.length) {
    loadQuestion();
} else {
    quizCompleted();
}}

function quizCompleted() {
questionElement.innerText = "Quiz finalizado!";
optionsElement.innerHTML = '';
scoreElement.innerText = "Você foi bem em " + score + " de " + quizData.length + " perguntas. \n Confira abaixo como ter atitudes sustentáveis.";
scoreElement.style.display = "block";

const nextButton = document.querySelector('button');
nextButton.classList.add('hidden');
}

loadQuestion();

document.getElementById("comentarios-form").addEventListener("submit", function(event) {
    alert("Mensagem enviada!");
});