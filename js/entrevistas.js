$(document).ready(function() {
    // Configuração do Modal e Player
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoPlayer = document.getElementById('videoPlayer');
    const videoLoading = document.querySelector('.video-loading');
    const videoDownloadLink = document.getElementById('videoDownloadLink');
    let currentVideoUrl = '';

    // Evento: Botão "Assistir Entrevista"
    $('.btn-assistir').click(function() {
        currentVideoUrl = $(this).data('video');
        const entrevistado = $(this).closest('.card').find('.card-title').text();
        
        // Configura o modal
        $('#videoModalLabel').text(`Entrevista com ${entrevistado}`);
        videoDownloadLink.href = currentVideoUrl;
        
        // Prepara o player
        videoPlayer.innerHTML = '';
        videoLoading.classList.remove('d-none');
        
        // Adiciona source ao player
        const source = document.createElement('source');
        source.src = currentVideoUrl;
        source.type = 'video/mp4';
        videoPlayer.appendChild(source);
        
        // Tenta carregar o vídeo
        videoPlayer.load();
        
        // Abre o modal
        videoModal.show();
    });

    // Eventos do Player de Vídeo
    videoPlayer.addEventListener('loadeddata', function() {
        videoLoading.classList.add('d-none');
        videoPlayer.play().catch(e => console.log("Autoplay bloqueado:", e));
    });

    videoPlayer.addEventListener('error', function() {
        videoLoading.classList.add('d-none');
        videoPlayer.innerHTML = `
            <div class="video-error p-4 text-center">
                <i class="fas fa-exclamation-triangle fa-3x mb-3 text-danger"></i>
                <h4 class="mb-3">Erro ao carregar o vídeo</h4>
                <p class="mb-3">O vídeo não pôde ser carregado. Verifique o link ou tente novamente mais tarde.</p>
                <a href="${currentVideoUrl}" class="btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt me-2"></i>Abrir diretamente
                </a>
            </div>
        `;
    });

    // Fechar Modal
    $('#videoModal').on('hidden.bs.modal', function() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    // Controle de Volume para Áudio (se existir)
    const audioPlayer = document.querySelector('audio');
    if (audioPlayer) {
        const savedVolume = localStorage.getItem('audioVolume');
        if (savedVolume) audioPlayer.volume = parseFloat(savedVolume);
        audioPlayer.addEventListener('volumechange', () => {
            localStorage.setItem('audioVolume', audioPlayer.volume);
        });
    }
});