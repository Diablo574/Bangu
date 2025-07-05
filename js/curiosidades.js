$(document).ready(function() {
    // Filtro de curiosidades por categoria
    $('.filter-buttons button').on('click', function() {
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.curiosidade-card').show();
        } else {
            $('.curiosidade-card').hide();
            $(`.curiosidade-card[data-category="${filter}"]`).show();
        }
    });
    
    // Modal de detalhes
    $('.btn-saber-mais').on('click', function() {
        const title = $(this).data('title');
        const content = $(this).data('content');
        
        $('#curiosidadeModalLabel').text(title);
        $('#curiosidadeModalBody').html(content);
    });
});