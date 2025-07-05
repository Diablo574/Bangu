$(document).ready(function() {
    // Configura o modal de notícias
    const noticiaModal = new bootstrap.Modal(document.getElementById('modalNoticia'));
    const modalTitle = document.getElementById('modalNoticiaLabel');
    const modalText = document.getElementById('modalNoticiaText');
    
    // Quando clicar em qualquer botão de notícia
    $('.noticia-link, .coluna-link').click(function() {
        const title = $(this).data('title');
        const text = $(this).data('text');
        
        // Define o título e texto no modal
        modalTitle.textContent = title;
        modalText.textContent = text;
    });
    
    // Ajusta o tema do modal quando o modal é aberto
    $('#modalNoticia').on('show.bs.modal', function() {
        const currentTheme = $('html').attr('data-theme');
        if (currentTheme === 'dark') {
            $(this).find('.modal-content').addClass('bg-dark text-white');
        } else {
            $(this).find('.modal-content').removeClass('bg-dark text-white');
        }
    });
});