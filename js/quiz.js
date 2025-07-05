$(document).ready(function() {
    // Perguntas do quiz
    const quizQuestions = [
        {
            question: "1. Em que ano foi oficializada a criação do Colégio Estadual Bangu como conhecemos hoje?",
            options: [
                "A) 1989",
                "B) 1993",
                "C) 2001",
                "D) 1942"
            ],
            answer: 1, // Índice da resposta correta (B)
            explanation: "O Colégio Estadual Bangu foi oficializado em 1993 pela fusão de outras escolas."
        },
        {
            question: "2. Quais colégios se uniram para formar o atual Colégio Estadual Bangu?",
            options: [
                "A) Colégio Rodrigues Alves e Ginásio Bangu",
                "B) Colégio Batalha de Collecchio e Escola Técnica de Bangu",
                "C) Colégio Jorge de Carvalho Batoca e Colégio Dídia Machado Fortes",
                "D) SENAI e Colégio Estadual Bangu"
            ],
            answer: 2, // Índice da resposta correta (C)
            explanation: "A fusão ocorreu entre o Colégio Jorge de Carvalho Batoca e o Colégio Dídia Machado Fortes."
        },
        {
            question: "3. Qual era o nome da escola criada pela Fábrica Bangu para os filhos dos operários no início do século XX?",
            options: [
                "A) Escola SENAI",
                "B) Colégio Técnico de Bangu",
                "C) Escola Presidente Rodrigues Alves",
                "D) Escola Municipal de Bangu"
            ],
            answer: 2, // Índice da resposta correta (C)
            explanation: "A Fábrica Bangu criou a Escola Presidente Rodrigues Alves para os filhos dos operários."
        },
        {
            question: "4. Qual instituição técnica foi criada em 1942 em prédio doado pela Fábrica Bangu?",
            options: [
                "A) Colégio Estadual Bangu",
                "B) Escola do SENAI",
                "C) Instituto Collecchio",
                "D) CIEP Bangu"
            ],
            answer: 1, // Índice da resposta correta (B)
            explanation: "A Fábrica Bangu doou o prédio para a criação da Escola do SENAI em 1942."
        },
        {
            question: "5. A origem do bairro Bangu está relacionada a:",
            options: [
                "A) Exploração de ouro",
                "B) Criação de gado",
                "C) Antiga fazenda e instalação de fábrica têxtil",
                "D) Colonização portuguesa e agricultura de cacau"
            ],
            answer: 2, // Índice da resposta correta (C)
            explanation: "Bangu originou-se de uma antiga fazenda onde foi instalada a fábrica têxtil."
        },
        {
            question: "6. O curso técnico iniciado no Colégio Estadual Bangu em 2008 foi em:",
            options: [
                "A) Administração",
                "B) Análises Clínicas",
                "C) Contabilidade",
                "D) Edificações"
            ],
            answer: 1, // Índice da resposta correta (B)
            explanation: "Em 2008 foi iniciado o curso técnico em Análises Clínicas."
        },
        {
            question: "7. Que fato histórico foi homenageado com o antigo nome 'Ginásio Collecchio'?",
            options: [
                "A) Independência do Brasil",
                "B) Revolução Industrial",
                "C) Batalha de Collecchio na Itália",
                "D) Proclamação da República"
            ],
            answer: 2, // Índice da resposta correta (C)
            explanation: "O nome homenageava a Batalha de Collecchio na Itália, onde o Conde de Bangu lutou."
        },
        {
            question: "8. Qual dessas estruturas foi construída pela Fábrica Bangu para seus operários?",
            options: [
                "A) Shoppings e cinemas",
                "B) Escolas, igrejas e clubes",
                "C) Hotéis e aeroportos",
                "D) Pontes e hospitais estaduais"
            ],
            answer: 1, // Índice da resposta correta (B)
            explanation: "A Fábrica Bangu construiu escolas, igrejas e clubes para seus operários."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    // Inicializa o quiz
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        showQuestion();
        $('#quiz-result').hide();
        $('#quiz-container').show();
    }

    // Mostra a pergunta atual
    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        
        // Atualiza o progresso
        $('.progress-bar').css('width', `${(currentQuestion / quizQuestions.length) * 100}%`);
        $('#current-question').text(currentQuestion + 1);
        
        // Cria o HTML da pergunta
        let html = `
            <div class="quiz-question">
                <div class="question-text">${question.question}</div>
                <div class="quiz-options">
        `;
        
        // Adiciona as opções
        question.options.forEach((option, index) => {
            html += `
                <div class="quiz-option" data-option="${index}">
                    <input type="radio" name="quiz-option" id="option-${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
                    <label for="option-${index}">${option}</label>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="quiz-actions">
                    <button id="prev-question" class="quiz-btn btn btn-outline-primary" ${currentQuestion === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left me-2"></i>Anterior
                    </button>
                    <button id="next-question" class="quiz-btn btn btn-primary">
                        ${currentQuestion === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima'}
                        <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        `;
        
        $('#quiz-container').html(html);
        
        // Adiciona eventos
        $('.quiz-option').click(function() {
            const selectedOption = $(this).data('option');
            userAnswers[currentQuestion] = selectedOption;
            $(this).find('input[type="radio"]').prop('checked', true);
            $('.quiz-option').removeClass('selected');
            $(this).addClass('selected');
        });
        
        $('#prev-question').click(prevQuestion);
        $('#next-question').click(nextQuestion);
    }

    // Vai para a próxima pergunta
    function nextQuestion() {
        if (userAnswers[currentQuestion] === undefined) {
            alert('Por favor, selecione uma resposta antes de continuar.');
            return;
        }
        
        // Verifica se a resposta está correta
        if (userAnswers[currentQuestion] === quizQuestions[currentQuestion].answer) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // Volta para a pergunta anterior
    function prevQuestion() {
        currentQuestion--;
        showQuestion();
    }

    // Mostra o resultado final
    function showResult() {
        $('#quiz-container').hide();
        
        const percentage = Math.round((score / quizQuestions.length) * 100);
        let title, message;
        
        if (percentage >= 80) {
            title = "Parabéns! 🎉";
            message = "Você é um expert na história do C.E. Bangu!";
        } else if (percentage >= 50) {
            title = "Bom trabalho! 👍";
            message = "Você sabe bastante sobre a história da escola, mas pode melhorar!";
        } else {
            title = "Continue aprendendo! 📚";
            message = "Aproveite para conhecer mais sobre a história do C.E. Bangu!";
        }
        
        $('.result-title').text(title);
        $('.result-score').text(`${score}/${quizQuestions.length}`);
        $('.result-message').text(message);
        
        $('#quiz-result').show();
    }

    // Reinicia o quiz
    $('#restart-quiz').click(initQuiz);

    // Inicia o quiz quando a página carrega
    initQuiz();
});