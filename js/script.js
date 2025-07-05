$(document).ready(function() {
    // ===== FUNÇÕES ORIGINAIS =====
    function initMenu() {
        if ($(window).width() >= 768) {
            $('#sidebar').addClass('active');
            $('#content').css('margin-left', '280px');
        } else {
            $('#sidebar').removeClass('active');
            $('#content').css('margin-left', '0');
        }
    }
    initMenu();

    $('#sidebarCollapse, #sidebarCollapseMobile').on('click', function() {
        $('#sidebar').toggleClass('active');
        
        if ($('#sidebar').hasClass('active')) {
            $('#sidebarCollapse i').removeClass('fa-bars').addClass('fa-times');
            $('#sidebarCollapseMobile i').removeClass('fa-bars').addClass('fa-times');
        } else {
            $('#sidebarCollapse i').removeClass('fa-times').addClass('fa-bars');
            $('#sidebarCollapseMobile i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    function setTheme(theme) {
        $('html').attr('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            $('#themeToggle i').removeClass('fa-moon').addClass('fa-sun');
            $('#themeToggle').html('<i class="fas fa-sun"></i> Tema Claro');
            $('#themeToggleMobile i').removeClass('fa-moon').addClass('fa-sun');
        } else {
            $('#themeToggle i').removeClass('fa-sun').addClass('fa-moon');
            $('#themeToggle').html('<i class="fas fa-moon"></i> Tema Escuro');
            $('#themeToggleMobile i').removeClass('fa-sun').addClass('fa-moon');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    $('#themeToggle, #themeToggleMobile').on('click', function() {
        const currentTheme = $('html').attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    $('#sidebar ul li a').on('click', function() {
        if ($(window).width() < 768) {
            $('#sidebar').removeClass('active');
            $('#sidebarCollapse i').removeClass('fa-times').addClass('fa-bars');
            $('#sidebarCollapseMobile i').removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    $(window).resize(function() {
        initMenu();
    });
    
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // ===== NOVAS FUNCIONALIDADES =====
    // Sistema de Data Atual (Funcionando em tempo real)
    function updateCurrentDate() {
        const now = new Date();
        const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        
        $('#current-day').text(now.getDate());
        $('#current-date').text(`${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`);
    }
    updateCurrentDate();
    setInterval(updateCurrentDate, 60000); // Atualiza a cada minuto

});