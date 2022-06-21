$(document).ready(function () {

    (function () {
        // Functions
        function buildQuiz() {
            // variable to store the HTML output
            const output = [];

            // for each question...
            myQuestions.forEach(
                (currentQuestion, questionNumber) => {

                    // variable to store the list of possible answers
                    const answers = [];

                    // and for each available answer...
                    for (letter in currentQuestion.answers) {

                        // ...add an HTML radio button
                        answers.push(
                            `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                        );
                    }

                    // add this question and its answers to the output
                    output.push(
                        `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
                    );
                }
            );

            // finally combine our output list into one string of HTML and put it on the page
            quizContainer.innerHTML = output.join('');
        }

        function showResults() {

            // gather answer containers from our quiz
            const answerContainers = quizContainer.querySelectorAll('.answers');

            // keep track of user's answers
            let numCorrect = 0;

            // for each question...
            myQuestions.forEach((currentQuestion, questionNumber) => {

                // find selected answer
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                // if answer is correct
                if (userAnswer === currentQuestion.correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;

                    // color the answers green
                    answerContainers[questionNumber].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[questionNumber].style.color = 'red';
                }
            });

            // show number of correct answers out of total
            resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove('active-slide');
            slides[n].classList.add('active-slide');
            currentSlide = n;
            if (currentSlide === 0) {
                previousButton.style.display = 'none';
            } else {
                previousButton.style.display = 'inline-block';
            }
            if (currentSlide === slides.length - 1) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            } else {
                nextButton.style.display = 'inline-block';
                submitButton.style.display = 'none';
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }

        // Variables
        const quizContainer = document.getElementById('quiz');
        const resultsContainer = document.getElementById('results');
        const submitButton = document.getElementById('submit');
        const myQuestions = [{
                question: "Quem inventou o JavaScript?",
                answers: {
                    a: "Douglas Crockford",
                    b: "Sheryl Sandberg",
                    c: "Brendan Eich"
                },
                correctAnswer: "c"
            },
            {
                question: "Que tipos de dados sao suportados em JavaScript?",
                answers: {
                    a: "Apenas numeros",
                    b: "Numero, String, Indeterminado, Nulo e Booleano",
                    c: "Numeros e Strings"
                },
                correctAnswer: "b"
            },
            {
                question: "Qual simbolo eh usado para comentarios em JavaScript?",
                answers: {
                    a: "Para uma linha '//'\n Para varias linhas '/ *  * /' ",
                    b: "//",
                    c: "#"
                },
                correctAnswer: "a"
            },
            {
                question: "Em JavaScript, qual seria o resultado de 3 + 2 + '7' ?",
                answers: {
                    a: "12",
                    b: "5",
                    c: "57"
                },
                correctAnswer: "c"
            },
            {
                question: "Qual empresa desenvolveu JavaScript?",
                answers: {
                    a: "Netscape",
                    b: "Apple",
                    c: "Dell"
                },
                correctAnswer: "a"
            },
            {
                question: "O que sao variaveis globais?",
                answers: {
                    a: "Variaveis de multiplas linguas",
                    b: "Sao variaveis estrangeiras",
                    c: "Variaveis definidas fora das funcoes que podem ser usadas em qualquer funcao"
                },
                correctAnswer: "c"
            },
            {
                question: "O que eh uma caixa de prompt?",
                answers: {
                    a: "Caixa de dialogo com alerta",
                    b: "Caixa de dialogo com uma mensagem opcional solicitando que o usuario insira algum texto",
                    c: "Terminal do pc"
                },
                correctAnswer: "b"
            },
            {
                question: "Onde eh usado JavaScript?",
                answers: {
                    a: "Apenas desenvolvimento web",
                    b: "Desenvolvimento web, desenvolvimento de aplicativos mobile e de aplicacoes de backend ",
                    c: "N.D.A"
                },
                correctAnswer: "b"
            },
            {
                question: "Oque significa '!=' ",
                answers: {
                    a: "Igual",
                    b: "Maior que",
                    c: "Nao igual"
                },
                correctAnswer: "c"
            },
            {
                question: "Oque significa '===' ?",
                answers: {
                    a: "Comparacao",
                    b: "Comparacao de valores e tipos",
                    c: "Igual",
                    d: "N.D.A"
                },
                correctAnswer: "b"
            }
        ];

        // Kick things off
        buildQuiz();

        // Pagination
        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        // Show the first slide
        showSlide(currentSlide);

        // Event listeners
        submitButton.addEventListener('click', showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
    })();

});