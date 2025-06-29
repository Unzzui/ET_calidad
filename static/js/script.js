let currentSlide = 0;
const totalSlides = 12;
let slides;

function initializeSlides() {
    slides = document.querySelectorAll('.slide');
}

function showSlide(n) {
    if (!slides || slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= totalSlides) currentSlide = 0;
    else if (n < 0) currentSlide = totalSlides - 1;
    else currentSlide = n;
    
    slides[currentSlide].classList.add('active');
    document.getElementById('current-slide').textContent = currentSlide + 1;
}

function nextSlide() {
    if (!slides || slides.length === 0) return;
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (!slides || slides.length === 0) return;
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        currentSlide = 0;
        showSlide(currentSlide);
    } else if (e.key === 'End') {
        e.preventDefault();
        if (totalSlides > 0) {
            currentSlide = totalSlides - 1;
            showSlide(currentSlide);
        }
    }
});

// Navegación con gestos táctiles (para móviles)
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) return;
    
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    
    let diffX = startX - endX;
    let diffY = startY - endY;
    
    // Verificar que es un swipe horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            nextSlide(); // Swipe left = siguiente
        } else if (diffX < -50) {
            previousSlide(); // Swipe right = anterior
        }
    }
    
    startX = 0;
    startY = 0;
});

// Auto-avance opcional (descomenta la siguiente línea para activar)
// setInterval(nextSlide, 10000); // Cambia slide cada 10 segundos

// Modo presentación (F11 o doble click para pantalla completa)
document.addEventListener('dblclick', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    showSlide(0);
});