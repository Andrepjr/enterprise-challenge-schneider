const quizData = [
    {
      question: 'Qual destas opções é uma religião de origem brasileira?',
      options: ['Umbanda', 'Catolicismo', 'Espiritismo', 'Candomblé'],
      answer: 'Umbanda',
    },
    {
      question: 'Qual o estado com a maior concentração de indígenas no Brasil?',
      options: ['São Paulo', 'Bahia', 'Rio de Janeiro', 'Amazonas'],
      answer: 'Amazonas',
    },
    {
      question: 'Qual a cidade com a melhor acessibilidade urbana no Brasil?',
      options: [
        'Curitiba',
        'São Paulo',
        'Salvador',
        'Campinas',
      ],
      answer: 'São Paulo',
    },
    {
      question: 'Quando é comemorado o Dia Internacional do Orgulho LGBT?',
      options: [
        '30 de novembro',
        '28 de junho',
        '6 de outubro',
        '17 de março',
      ],
      answer: '28 de junho',
    },
    {
      question: 'Quem assinou a Lei Áurea, que determinou a abolição da escravidão no Brasil?',
      options: ['Dom Pedro I', 'Zumbi dos Palmares', 'Princesa Isabel', 'Dom João VI'],
      answer: 'Princesa Isabel',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Você acertou ${score} de ${quizData.length} questões!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Questão:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Sua resposta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Resposta correta:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Você acertou ${score} de ${quizData.length}!</p>
      <p>Respostas incorretas:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();