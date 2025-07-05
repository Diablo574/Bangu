$(document).ready(function() {
    // Filtro de alunos por categoria
    $('.filter-buttons button').on('click', function() {
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.aluno-card').show();
        } else {
            $('.aluno-card').hide();
            $(`.aluno-card[data-category="${filter}"]`).show();
        }
        
        // Reativa a observação dos elementos após filtro
        observeElements();
    });
    
    // Adicionar badges de categoria
    $('.aluno-card').each(function() {
        const category = $(this).data('category');
        const badgeText = category.charAt(0).toUpperCase() + category.slice(1);
        $(this).find('.card').prepend(`<span class="category-badge category-${category}">${badgeText}</span>`);
    });
    
    // Observador de elementos para animação
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    function observeElements() {
        $('.aluno-card').each(function() {
            if ($(this).is(':visible')) {
                observer.observe(this);
            }
        });
    }
    
    // Inicia a observação
    observeElements();
    
    // Observa também quando a página é rolada
    $(window).on('scroll', function() {
        observeElements();
    });
});