document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const resetButton = document.querySelector('#reset');
    const modalPlayer = document.getElementById('devModal');
    const modalComputer = document.getElementById('modalComputador');
    const closeButtons = document.querySelectorAll('.close');
    const dificuldadeSelect = document.getElementById('dificuldade');
    
    // Variáveis de estado
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let waitingForComputer = false;
    let dificuldade = 'medio';

    // Condições de vitória
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6]             // diagonais
    ];

    // Função para verificar o vencedor
    function checkWinner() {
        // Verifica primeiro se há um vencedor
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]; // Retorna 'X' ou 'O' se houver vencedor
            }
        }
        
        // Só considera empate se o tabuleiro estiver completamente preenchido
        // E não houver vencedor (verificação acima)
        if (!gameState.includes('')) {
            return 'Empate';
        }
        
        // Retorna null se o jogo deve continuar
        return null;
    }

    // Função para obter células vazias
    function getEmptyCells() {
        return gameState
            .map((cell, index) => cell === '' ? index : null)
            .filter(val => val !== null);
    }

    // Função para a jogada do computador
    function computerMove() {
        const emptyCells = getEmptyCells();
        if (emptyCells.length === 0) return -1;

        // Lógica para dificuldade fácil (totalmente aleatório)
        if (dificuldade === 'facil') {
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        // Função auxiliar para verificar jogadas estratégicas
        const makeStrategicMove = (player) => {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                const line = [gameState[a], gameState[b], gameState[c]];
                const emptyIndex = [a, b, c].find(index => gameState[index] === '');
                
                if (line.filter(x => x === player).length === 2 && emptyIndex !== undefined) {
                    return emptyIndex;
                }
            }
            return -1;
        };

        // Lógica para dificuldade média
        if (dificuldade === 'medio') {
            const blockMove = makeStrategicMove('X'); // Tenta bloquear o jogador
            if (blockMove !== -1) return blockMove;
            if (gameState[4] === '') return 4; // Prioriza o centro
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        // Lógica para dificuldade difícil
        if (dificuldade === 'dificil') {
            const winMove = makeStrategicMove('O'); // Tenta vencer
            if (winMove !== -1) return winMove;
            const blockMove = makeStrategicMove('X'); // Bloqueia o jogador
            if (blockMove !== -1) return blockMove;
            if (gameState[4] === '') return 4;
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        // Lógica para dificuldades hardcore e impossível (usa Minimax)
        if (dificuldade === 'hardcore' || dificuldade === 'impossivel') {
            let bestScore = -Infinity;
            let move = -1;
            
            for (let i = 0; i < gameState.length; i++) {
                if (gameState[i] === '') {
                    gameState[i] = 'O';
                    const score = minimax(gameState, 0, false);
                    gameState[i] = '';
                    
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            return move;
        }
        
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Algoritmo Minimax para jogadas perfeitas
    function minimax(board, depth, isMaximizing) {
        const winner = checkWinner();
        
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (winner === 'Empate') return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Função principal para lidar com cliques
    function handleCellClick(index) {
        // Impede cliques se o jogo não estiver ativo, durante a jogada do computador
        // ou em células já preenchidas
        if (!gameActive || waitingForComputer || gameState[index] !== '') return;
        
        // Faz a jogada do usuário
        makeMove(index, 'X');
        
        // Verifica se o jogo terminou
        const winner = checkWinner();
        if (winner) {
            endGame(winner);
            return;
        }
        
        // Se ainda houver células vazias, passa a vez para o computador
        if (getEmptyCells().length > 0) {
            waitingForComputer = true;
            status.textContent = 'Computador pensando...';
            
            setTimeout(() => {
                const move = computerMove();
                if (move !== -1) {
                    makeMove(move, 'O');
                    const newWinner = checkWinner();
                    if (newWinner) {
                        endGame(newWinner);
                    }
                }
                waitingForComputer = false;
                if (gameActive) {
                    status.textContent = 'Sua vez (X)';
                }
            }, dificuldade === 'facil' ? 300 : 600);
        }
    }

    // Função para realizar uma jogada
    function makeMove(index, player) {
        gameState[index] = player;
        cells[index].classList.add(player.toLowerCase());
        currentPlayer = player === 'X' ? 'O' : 'X';
    }

    // Função para finalizar o jogo
    function endGame(winner) {
        gameActive = false;
        
        if (winner === 'X') {
            status.textContent = 'Você venceu!';
            modalPlayer.style.display = 'block';
        } else if (winner === 'O') {
            status.textContent = 'O computador venceu!';
            modalComputer.style.display = 'block';
        } else {
            status.textContent = 'Empate!';
        }
    }

    // Função para reiniciar o jogo
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        waitingForComputer = false;
        status.textContent = 'Sua vez (X)';
        
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    }

    // Event Listeners
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    dificuldadeSelect.addEventListener('change', (e) => {
        dificuldade = e.target.value;
        resetGame();
    });

    resetButton.addEventListener('click', resetGame);
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalPlayer.style.display = 'none';
            modalComputer.style.display = 'none';
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target === modalPlayer) modalPlayer.style.display = 'none';
        if (e.target === modalComputer) modalComputer.style.display = 'none';
    });
});