document.addEventListener('DOMContentLoaded', function() {
    let palavras = [];
    let palavraSecreta = "";
    let letrasAcertadas = [];
    let letrasErradas = [];
    let erros = 0;
    const maxErros = 6;

    const palavraElement = document.getElementById('palavra');
    const dicaElement = document.getElementById('dica').querySelector('span');
    const errosElement = document.getElementById('erros');
    const tecladoElement = document.querySelector('.teclado');
    const resetButton = document.getElementById('reset-forca');
    const modal = document.getElementById('resultadoModal');
    const resultadoTitulo = document.getElementById('resultadoTitulo');
    const resultadoMensagem = document.getElementById('resultadoMensagem');
    const palavraCorreta = document.getElementById('palavraCorreta');
    const jogarNovamenteButton = document.getElementById('jogarNovamente');
    const closeButton = document.querySelector('.close');

    // Carregar palavras do JSON
    fetch('palavras.json')
        .then(response => response.json())
        .then(data => {
            palavras = data;
            iniciarJogo();
        })
        .catch(error => {
            console.error('Erro ao carregar palavras:', error);
            // Fallback caso o JSON não carregue
            palavras = [
                { plvr: "BANGU", tema: "Escola", dica: "Nome da escola" },
                { plvr: "PROFESSOR", tema: "Pessoa", dica: "Quem ensina" }
            ];
            iniciarJogo();
        });

    // Criar teclado
    function criarTeclado() {
        tecladoElement.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letra = String.fromCharCode(i);
            const tecla = document.createElement('div');
            tecla.className = 'tecla';
            tecla.textContent = letra;
            tecla.addEventListener('click', () => verificarLetra(letra));
            tecladoElement.appendChild(tecla);
        }
    }

const mapaAcentos = {
    'A': ['A', 'Á', 'À', 'Ã', 'Â'],
    'E': ['E', 'É', 'Ê'],
    'I': ['I', 'Í'],
    'O': ['O', 'Ó', 'Õ', 'Ô'],
    'U': ['U', 'Ú'],
    'C': ['C', 'Ç']
};

    // Iniciar novo jogo
    function iniciarJogo() {
        if (palavras.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * palavras.length);
        palavraSecreta = palavras[randomIndex].plvr.toUpperCase();
        dicaElement.textContent = palavras[randomIndex].dica;
        
        letrasAcertadas = Array(palavraSecreta.length).fill('_');
        letrasErradas = [];
        erros = 0;
        
        atualizarPalavra();
        atualizarErros();
        resetarBoneco();
        criarTeclado();
    }

    // Atualizar exibição da palavra
    function atualizarPalavra() {
        palavraElement.textContent = letrasAcertadas.join(' ');
    }

    // Atualizar contagem de erros
    function atualizarErros() {
        errosElement.textContent = `${erros}/${maxErros}`;
    }

    // Verificar letra escolhida
    function verificarLetra(letra) {
        const teclas = document.querySelectorAll('.tecla');
        const tecla = Array.from(teclas).find(t => t.textContent === letra);
        
        if (tecla.classList.contains('usada')) {
            return;
        }
        
        tecla.classList.add('usada');
        
const letrasEquivalentes = mapaAcentos[letra] || [letra];
let acertou = false;

for (let i = 0; i < palavraSecreta.length; i++) {
    if (letrasEquivalentes.includes(palavraSecreta[i])) {
        letrasAcertadas[i] = palavraSecreta[i];
        acertou = true;
    }
}

         if (acertou) {
    atualizarPalavra();
            
            // Verificar vitória
            if (!letrasAcertadas.includes('_')) {
                mostrarResultado(true);
            }
        } else {
            // Letra errada
            letrasErradas.push(letra);
            erros++;
            atualizarErros();
            atualizarBoneco();
            
            // Verificar derrota
            if (erros >= maxErros) {
                mostrarResultado(false);
            }
        }
    }

    // Atualizar visual do boneco da forca
    function atualizarBoneco() {
        const partesBoneco = [
            'cabeca', 'corpo', 'braco-esquerdo', 
            'braco-direito', 'perna-esquerda', 'perna-direita'
        ];
        
        if (erros > 0 && erros <= partesBoneco.length) {
            document.getElementById(partesBoneco[erros - 1]).style.display = 'block';
        }
    }

    // Resetar boneco da forca
    function resetarBoneco() {
        const partes = document.querySelectorAll('.parte-boneco');
        partes.forEach(parte => {
            parte.style.display = 'none';
        });
    }

    // Mostrar resultado do jogo
    function mostrarResultado(venceu) {
        if (venceu) {
            resultadoTitulo.textContent = 'Parabéns! Você venceu!';
            resultadoMensagem.textContent = 'Você adivinhou a palavra corretamente!';
        } else {
            resultadoTitulo.textContent = 'Game Over!';
            resultadoMensagem.textContent = 'Você não conseguiu adivinhar a palavra.';
        }
        
        palavraCorreta.textContent = palavraSecreta;
        modal.style.display = 'block';
    }

    // Event listeners
    resetButton.addEventListener('click', iniciarJogo);
    jogarNovamenteButton.addEventListener('click', function() {
        modal.style.display = 'none';
        iniciarJogo();
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Criar partes do boneco dinamicamente
    function criarPartesBoneco() {
        const bonecoElement = document.getElementById('boneco');
        
        // Partes da forca
        const partesForca = [
            { id: 'base', style: 'width: 150px; height: 10px; bottom: 0; left: 50%; transform: translateX(-50%);' },
            { id: 'poste', style: 'width: 10px; height: 250px; bottom: 10px; left: 50%; transform: translateX(-50%);' },
            { id: 'topo', style: 'width: 100px; height: 10px; top: 0; left: 50%;' },
            { id: 'corda', style: 'width: 5px; height: 30px; top: 10px; left: calc(50% + 95px);' }
        ];
        
        // Partes do boneco
        const partesBoneco = [
            { id: 'cabeca', style: 'width: 40px; height: 40px; border-radius: 50%; top: 40px; left: calc(50% + 77.5px); border: 5px solid var(--text-primary); background-color: transparent;' },
            { id: 'corpo', style: 'width: 5px; height: 80px; top: 85px; left: calc(50% + 100px);' },
            { id: 'braco-esquerdo', style: 'width: 50px; height: 5px; top: 100px; left: calc(50% + 55px); transform: rotate(30deg); transform-origin: right center;' },
            { id: 'braco-direito', style: 'width: 50px; height: 5px; top: 100px; left: calc(50% + 100px); transform: rotate(-30deg); transform-origin: left center;' },
            { id: 'perna-esquerda', style: 'width: 50px; height: 5px; top: 160px; left: calc(50% + 55px); transform: rotate(-30deg); transform-origin: right center;' },
            { id: 'perna-direita', style: 'width: 50px; height: 5px; top: 160px; left: calc(50% + 100px); transform: rotate(30deg); transform-origin: left center;' }
        ];
        
        // Criar elementos
        partesForca.forEach(parte => {
            const elemento = document.createElement('div');
            elemento.id = parte.id;
            elemento.className = 'parte-boneco';
            elemento.style.cssText = parte.style;
            elemento.style.display = 'block'; // Partes da forca sempre visíveis
            bonecoElement.appendChild(elemento);
        });
        
        partesBoneco.forEach(parte => {
            const elemento = document.createElement('div');
            elemento.id = parte.id;
            elemento.className = 'parte-boneco';
            elemento.style.cssText = parte.style;
            bonecoElement.appendChild(elemento);
        });
    }

    // Inicializar partes do boneco
    criarPartesBoneco();
});