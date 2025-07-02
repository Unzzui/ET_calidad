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

// Navegación con teclado mejorada (incluye soporte para controles remotos)
document.addEventListener('keydown', function(e) {
    // Prevenir comportamiento por defecto para teclas de navegación
    const navigationKeys = [
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'PageUp', 'PageDown', 'Home', 'End',
        'Space', 'Enter', 'Escape'
    ];
    
    if (navigationKeys.includes(e.key)) {
        e.preventDefault();
    }
    
    // Flag para rastrear si manejamos el evento
    let handled = false;
    
    // Manejar eventos de teclas modernas primero
    switch(e.key) {
        // Teclas de flecha estándar
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
            previousSlide();
            handled = true;
            break;
            
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case 'Space':
            nextSlide();
            handled = true;
            break;
            
        // Teclas Home/End
        case 'Home':
            currentSlide = 0;
            showSlide(currentSlide);
            handled = true;
            break;
            
        case 'End':
            if (totalSlides > 0) {
                currentSlide = totalSlides - 1;
                showSlide(currentSlide);
            }
            handled = true;
            break;
            
        // Teclas numéricas para navegación directa
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            const slideNum = parseInt(e.key);
            if (slideNum <= totalSlides) {
                currentSlide = slideNum - 1;
                showSlide(currentSlide);
            }
            handled = true;
            break;
            
        // Teclas específicas de control remoto
        case 'MediaTrackNext':
        case 'MediaPlayPause':
            nextSlide();
            handled = true;
            break;
            
        case 'MediaTrackPrevious':
            previousSlide();
            handled = true;
            break;
            
        // Teclas de TV Remote (algunos navegadores las soportan)
        case 'ChannelUp':
            nextSlide();
            handled = true;
            break;
            
        case 'ChannelDown':
            previousSlide();
            handled = true;
            break;
    }
    
    // Solo manejar eventos keyCode si el evento de tecla moderno no fue manejado
    // Esto es para navegadores antiguos o controles remotos específicos
    if (!handled) {
        switch(e.keyCode) {
            case 37: // Flecha izquierda
            case 38: // Flecha arriba
            case 33: // Page Up
                previousSlide();
                break;
                
            case 39: // Flecha derecha
            case 40: // Flecha abajo
            case 34: // Page Down
            case 32: // Espacio
                nextSlide();
                break;
                
            case 36: // Home
                currentSlide = 0;
                showSlide(currentSlide);
                break;
                
            case 35: // End
                if (totalSlides > 0) {
                    currentSlide = totalSlides - 1;
                    showSlide(currentSlide);
                }
                break;
                
            // Teclas numéricas (48-57 son 0-9)
            case 49: case 50: case 51: case 52: case 53:
            case 54: case 55: case 56: case 57:
                const slideNumber = e.keyCode - 48;
                if (slideNumber <= totalSlides) {
                    currentSlide = slideNumber - 1;
                    showSlide(currentSlide);
                }
                break;
        }
    }
});

// Inicializar soporte para control remoto
function initializeRemoteControl() {
    // Soporte para Gamepad API para game controllers y algunos controles remotos
    let gamepadIndex = -1;
    
    window.addEventListener('gamepadconnected', function(e) {
        console.log('Gamepad/Remote conectado:', e.gamepad.id);
        gamepadIndex = e.gamepad.index;
        startGamepadPolling();
    });
    
    window.addEventListener('gamepaddisconnected', function(e) {
        console.log('Gamepad/Remote desconectado');
        gamepadIndex = -1;
    });
    
    // Función de polling del gamepad
    let lastButtonStates = {};
    
    function startGamepadPolling() {
        function pollGamepad() {
            if (gamepadIndex === -1) return;
            
            const gamepad = navigator.getGamepads()[gamepadIndex];
            if (!gamepad) return;
            
            // Verificar D-pad y botones
            const buttons = gamepad.buttons;
            
            // D-pad izquierda (botón 14) o stick izquierdo izquierda
            if ((buttons[14] && buttons[14].pressed && !lastButtonStates[14]) || 
                (gamepad.axes[0] < -0.5 && !lastButtonStates['axisLeft'])) {
                previousSlide();
                lastButtonStates[14] = true;
                lastButtonStates['axisLeft'] = true;
            } else if ((!buttons[14] || !buttons[14].pressed) && gamepad.axes[0] > -0.5) {
                lastButtonStates[14] = false;
                lastButtonStates['axisLeft'] = false;
            }
            
            // D-pad derecha (botón 15) o stick izquierdo derecha
            if ((buttons[15] && buttons[15].pressed && !lastButtonStates[15]) || 
                (gamepad.axes[0] > 0.5 && !lastButtonStates['axisRight'])) {
                nextSlide();
                lastButtonStates[15] = true;
                lastButtonStates['axisRight'] = true;
            } else if ((!buttons[15] || !buttons[15].pressed) && gamepad.axes[0] < 0.5) {
                lastButtonStates[15] = false;
                lastButtonStates['axisRight'] = false;
            }
            
            // Botón A (botón 0) para siguiente
            if (buttons[0] && buttons[0].pressed && !lastButtonStates[0]) {
                nextSlide();
                lastButtonStates[0] = true;
            } else if (!buttons[0] || !buttons[0].pressed) {
                lastButtonStates[0] = false;
            }
            
            // Botón B (botón 1) para anterior
            if (buttons[1] && buttons[1].pressed && !lastButtonStates[1]) {
                previousSlide();
                lastButtonStates[1] = true;
            } else if (!buttons[1] || !buttons[1].pressed) {
                lastButtonStates[1] = false;
            }
            
            requestAnimationFrame(pollGamepad);
        }
        
        pollGamepad();
    }
    
    // Soporte táctil/swipe mejorado para controles remotos con pantalla táctil
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Distancia mínima de swipe
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe derecha - slide anterior
                previousSlide();
            } else {
                // Swipe izquierda - siguiente slide
                nextSlide();
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
    
    // Gestión de focus para mejor soporte de control remoto
    document.addEventListener('focus', function() {
        // Asegurar que el documento puede recibir eventos de teclado
        if (document.activeElement === document.body) {
            document.body.focus();
        }
    });
    
    // Asegurar que el documento puede recibir focus
    document.body.setAttribute('tabindex', '-1');
    document.body.focus();
}

// Navegación con gestos táctiles (para móviles) - Mantenido para compatibilidad
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

// Exponer funciones de navegación globalmente para control externo
window.presentationControl = {
    nextSlide: nextSlide,
    previousSlide: previousSlide,
    goToSlide: function(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            currentSlide = slideNumber - 1;
            showSlide(currentSlide);
        }
    },
    getCurrentSlide: () => currentSlide + 1,
    getTotalSlides: () => totalSlides
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    showSlide(0);
    initializeRemoteControl();
});