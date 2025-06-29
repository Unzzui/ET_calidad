// Configuración del proyecto Xerox con datos históricos (1981-1990)
const xeroxProjectData = {
    title: "Sistema de Gestión de Calidad Xerox",
    startYear: 1981,
    endYear: 1990,
    duration: 120, // meses (10 años)
    phases: [
        {
            id: 1,
            name: "FASE 1: DIAGNÓSTICO Y PREPARACIÓN",
            color: "#0066CC", // Azul
            activities: [
                { 
                    name: "Análisis comparativo con Fuji-Xerox", 
                    startMonth: 0,  // Enero 1981
                    duration: 18,   // 18 meses
                    endMonth: 18    // Junio 1982
                },
                { 
                    name: "Benchmarking competitivo", 
                    startMonth: 0,  // Enero 1981
                    duration: 24,   // 24 meses
                    endMonth: 24    // Diciembre 1982
                }
            ]
        },
        {
            id: 2,
            name: "FASE 2: REESTRUCTURACIÓN DE PROVEEDORES",
            color: "#28A745", // Verde
            activities: [
                { 
                    name: "Formación equipos primarios", 
                    startMonth: 12, // Enero 1982
                    duration: 12,   // 12 meses
                    endMonth: 24    // Diciembre 1982
                },
                { 
                    name: "Reducción base proveedores", 
                    startMonth: 12, // Enero 1982
                    duration: 36,   // 36 meses
                    endMonth: 48    // Diciembre 1984
                },
                { 
                    name: "Capacitación proveedores en calidad", 
                    startMonth: 18, // Julio 1982
                    duration: 42,   // 42 meses
                    endMonth: 60    // Diciembre 1985
                }
            ]
        },
        {
            id: 3,
            name: "FASE 3: TRANSFORMACIÓN CULTURAL",
            color: "#FF6B35", // Naranja
            activities: [
                { 
                    name: "Diseño programa \"Liderazgo mediante Calidad\"", 
                    startMonth: 24, // Enero 1983
                    duration: 12,   // 12 meses
                    endMonth: 36    // Diciembre 1983
                },
                { 
                    name: "Capacitación alta gerencia", 
                    startMonth: 24, // Enero 1983
                    duration: 24,   // 24 meses
                    endMonth: 48    // Diciembre 1984
                },
                { 
                    name: "Despliegue capacitación global", 
                    startMonth: 36, // Enero 1984
                    duration: 36,   // 36 meses
                    endMonth: 72    // Diciembre 1986
                }
            ]
        },
        {
            id: 4,
            name: "FASE 4: REDISEÑO DE PROCESOS",
            color: "#DC3545", // Rojo
            activities: [
                { 
                    name: "Creación equipos desarrollo productos", 
                    startMonth: 48, // Enero 1985
                    duration: 24,   // 24 meses
                    endMonth: 72    // Diciembre 1986
                },
                { 
                    name: "Implementación desarrollo conjunto", 
                    startMonth: 60, // Enero 1986
                    duration: 36,   // 36 meses
                    endMonth: 96    // Diciembre 1988
                }
            ]
        },
        {
            id: 5,
            name: "FASE 5: INTEGRACIÓN LOGÍSTICA",
            color: "#6F42C1", // Púrpura
            activities: [
                { 
                    name: "Diseño sistema logístico integrado", 
                    startMonth: 84, // Enero 1988
                    duration: 24,   // 24 meses
                    endMonth: 108   // Diciembre 1989
                },
                { 
                    name: "Implementación Central Logistics", 
                    startMonth: 96, // Enero 1989
                    duration: 24,   // 24 meses
                    endMonth: 120   // Diciembre 1990
                }
            ]
        },
        {
            id: 6,
            name: "FASE 6: MEDICIÓN Y MEJORA CONTINUA",
            color: "#6C757D", // Gris
            activities: [
                { 
                    name: "Establecimiento métricas calidad", 
                    startMonth: 12, // Enero 1982
                    duration: 108,  // 108 meses (continuo)
                    endMonth: 120   // Diciembre 1990
                },
                { 
                    name: "Auditorías y revisiones", 
                    startMonth: 24, // Enero 1983
                    duration: 96,   // 96 meses (continuo)
                    endMonth: 120   // Diciembre 1990
                }
            ]
        }
    ],
    milestones: [
        { year: 1982, month: 12, description: "Inicio programa de proveedores" },
        { year: 1983, month: 12, description: "Lanzamiento \"Liderazgo mediante Calidad\"" },
        { year: 1990, month: 12, description: "Lanzamiento conjunto modelo 5100" }
    ]
};

// Configuración del canvas
let canvas, ctx;

// Función de inicialización
function initCanvas() {
    canvas = document.getElementById('xeroxGanttCanvas');
    if (!canvas) {
        console.error('No se pudo encontrar el canvas con ID: xeroxGanttCanvas');
        return false;
    }
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D del canvas');
        return false;
    }
    return true;
}

// Configuración visual
const config = {
    width: 1500,
    height: 800, // Reducido significativamente al eliminar leyendas
    margin: { top: 120, left: 400, right: 50, bottom: 30 }, // Reducido el margen inferior
    rowHeight: 40,
    yearWidth: 100, // Ancho por año
    monthWidth: 8.33, // 100/12 meses
    headerHeight: 50,
    colors: {
        background: '#FFFFFF',
        grid: '#E0E0E0',
        gridYear: '#B0B0B0',
        text: '#333333',
        textLight: '#666666',
        accent: '#FF6B35',
        milestone: '#FFD700'
    }
};

function drawXeroxGantt() {
    // Limpiar canvas
    ctx.fillStyle = config.colors.background;
    ctx.fillRect(0, 0, config.width, config.height);
    
    // Dibujar fondo del título
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, config.width, 70);
    
    // Borde inferior del área del título
    ctx.strokeStyle = config.colors.gridYear;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(config.width, 70);
    ctx.stroke();
    
    // Dibujar título principal
    ctx.fillStyle = config.colors.text;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(xeroxProjectData.title, config.width / 2, 30);
    
    // Dibujar subtítulo
    ctx.font = '14px Arial';
    ctx.fillStyle = config.colors.textLight;
    ctx.fillText('Programa "Liderazgo mediante Calidad" (1981-1990)', config.width / 2, 55);
    
    // Dibujar encabezados de años
    drawYearHeaders();
    
    // Dibujar líneas de la cuadrícula
    drawGrid();
    
    // Dibujar actividades por fase
    drawActivities();
    
    // Dibujar hitos importantes
    drawMilestones();
}

function drawYearHeaders() {
    const startX = config.margin.left;
    const startY = config.margin.top;
    
    // Dibujar años principales
    for (let year = xeroxProjectData.startYear; year <= xeroxProjectData.endYear; year++) {
        const x = startX + (year - xeroxProjectData.startYear) * config.yearWidth;
        
        // Fondo del encabezado del año
        ctx.fillStyle = year % 2 === 0 ? '#F8F9FA' : '#E9ECEF';
        ctx.fillRect(x, startY - config.headerHeight, config.yearWidth, config.headerHeight);
        
        // Borde del encabezado
        ctx.strokeStyle = config.colors.gridYear;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, startY - config.headerHeight, config.yearWidth, config.headerHeight);
        
        // Texto del año
        ctx.fillStyle = config.colors.text;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(year.toString(), x + config.yearWidth / 2, startY - 25);
        
        // Línea divisoria vertical del año
        ctx.strokeStyle = config.colors.gridYear;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, startY - config.headerHeight);
        ctx.lineTo(x, startY + getTotalRows() * config.rowHeight);
        ctx.stroke();
    }
    
    // Línea final del último año
    const finalX = startX + (xeroxProjectData.endYear - xeroxProjectData.startYear + 1) * config.yearWidth;
    ctx.strokeStyle = config.colors.gridYear;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(finalX, startY - config.headerHeight);
    ctx.lineTo(finalX, startY + getTotalRows() * config.rowHeight);
    ctx.stroke();
    
    // Dibujar marcas de semestres (más visibles que meses)
    ctx.strokeStyle = config.colors.grid;
    ctx.lineWidth = 1;
    ctx.font = '10px Arial';
    ctx.fillStyle = config.colors.textLight;
    
    for (let year = xeroxProjectData.startYear; year <= xeroxProjectData.endYear; year++) {
        const yearStartX = startX + (year - xeroxProjectData.startYear) * config.yearWidth;
        
        // Marca de mitad de año (junio)
        const midYearX = yearStartX + config.yearWidth / 2;
        ctx.beginPath();
        ctx.moveTo(midYearX, startY - config.headerHeight + 35);
        ctx.lineTo(midYearX, startY + getTotalRows() * config.rowHeight);
        ctx.stroke();
        
        // Etiquetas de semestres
        ctx.textAlign = 'center';
        ctx.fillText('S1', yearStartX + config.yearWidth / 4, startY - 8);
        ctx.fillText('S2', yearStartX + 3 * config.yearWidth / 4, startY - 8);
    }
}

function drawGrid() {
    const startX = config.margin.left;
    const startY = config.margin.top;
    const totalRows = getTotalRows();
    
    ctx.strokeStyle = config.colors.grid;
    ctx.lineWidth = 1;
    
    // Líneas horizontales
    for (let i = 0; i <= totalRows; i++) {
        const y = startY + i * config.rowHeight;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + xeroxProjectData.duration * config.monthWidth, y);
        ctx.stroke();
    }
}

function getTotalRows() {
    return xeroxProjectData.phases.reduce((total, phase) => total + phase.activities.length + 1, 0);
}

function drawActivities() {
    const startX = config.margin.left;
    const startY = config.margin.top;
    let currentRow = 0;
    
    xeroxProjectData.phases.forEach(phase => {
        // Dibujar nombre de la fase
        ctx.fillStyle = phase.color;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(phase.name, 10, startY + currentRow * config.rowHeight + config.rowHeight / 2 + 5);
        
        // Fondo de la fila de fase
        ctx.fillStyle = phase.color + '15'; // Transparencia
        ctx.fillRect(0, startY + currentRow * config.rowHeight, config.width, config.rowHeight);
        
        currentRow++;
        
        // Dibujar actividades de la fase
        phase.activities.forEach(activity => {
            const activityY = startY + currentRow * config.rowHeight;
            const activityStartX = startX + activity.startMonth * config.monthWidth;
            const activityWidth = activity.duration * config.monthWidth;
            
            // Nombre de la actividad
            ctx.fillStyle = config.colors.text;
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(activity.name, 10, activityY + config.rowHeight / 2 + 4);
            
            // Barra de la actividad
            ctx.fillStyle = phase.color;
            ctx.fillRect(activityStartX, activityY + 8, activityWidth, config.rowHeight - 16);
            
            // Borde de la barra
            ctx.strokeStyle = phase.color;
            ctx.lineWidth = 1;
            ctx.strokeRect(activityStartX, activityY + 8, activityWidth, config.rowHeight - 16);
            
            // Texto de duración en la barra (si hay espacio)
            if (activityWidth > 80) {
                ctx.fillStyle = config.colors.background;
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                const durationText = `${activity.duration}m`;
                ctx.fillText(durationText, activityStartX + activityWidth / 2, activityY + config.rowHeight / 2 + 3);
            }
            
            currentRow++;
        });
    });
}

function drawMilestones() {
    const startX = config.margin.left;
    const startY = config.margin.top;
    const totalHeight = getTotalRows() * config.rowHeight;
    
    xeroxProjectData.milestones.forEach((milestone, index) => {
        const milestoneMonth = (milestone.year - xeroxProjectData.startYear) * 12 + milestone.month - 1;
        const x = startX + milestoneMonth * config.monthWidth;
        
        // Línea vertical del hito
        ctx.strokeStyle = config.colors.milestone;
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.moveTo(x, startY - 20);
        ctx.lineTo(x, startY + totalHeight);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Círculo del hito en la parte superior
        ctx.fillStyle = config.colors.milestone;
        ctx.beginPath();
        ctx.arc(x, startY - 25, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Borde del círculo
        ctx.strokeStyle = config.colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Texto del hito en posición fija en la parte inferior
        const textY = startY + totalHeight + 30 + (index * 20);
        
        // Fondo del texto
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        const textWidth = ctx.measureText(`${milestone.year}: ${milestone.description}`).width + 10;
        ctx.fillRect(x - textWidth/2, textY - 15, textWidth, 18);
        
        // Borde del fondo
        ctx.strokeStyle = config.colors.milestone;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - textWidth/2, textY - 15, textWidth, 18);
        
        // Texto del hito (horizontal, no rotado)
        ctx.fillStyle = config.colors.text;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${milestone.year}: ${milestone.description}`, x, textY - 3);
        
        // Línea conectora del círculo al texto
        ctx.strokeStyle = config.colors.milestone;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(x, startY + totalHeight);
        ctx.lineTo(x, textY - 15);
        ctx.stroke();
        ctx.setLineDash([]);
    });
}



// Función para obtener información detallada al hacer clic
function getActivityInfo(x, y) {
    const startX = config.margin.left;
    const startY = config.margin.top;
    
    if (x < startX || y < startY) return null;
    
    const month = Math.floor((x - startX) / config.monthWidth);
    const row = Math.floor((y - startY) / config.rowHeight);
    
    let currentRow = 0;
    for (let phase of xeroxProjectData.phases) {
        if (row === currentRow) {
            return { type: 'phase', data: phase };
        }
        currentRow++;
        
        for (let activity of phase.activities) {
            if (row === currentRow) {
                if (month >= activity.startMonth && month <= activity.endMonth) {
                    return { type: 'activity', data: activity, phase: phase };
                }
            }
            currentRow++;
        }
    }
    
    return null;
}

// Event listeners
function setupEventListeners() {
    if (!canvas) return;
    
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const info = getActivityInfo(x, y);
        if (info) {
            if (info.type === 'activity') {
                const startYear = xeroxProjectData.startYear + Math.floor(info.data.startMonth / 12);
                const startMonth = (info.data.startMonth % 12) + 1;
                const endYear = xeroxProjectData.startYear + Math.floor(info.data.endMonth / 12);
                const endMonth = (info.data.endMonth % 12) + 1;
                
                alert(`Actividad: ${info.data.name}\n` +
                      `Fase: ${info.phase.name}\n` +
                      `Inicio: ${startMonth}/${startYear}\n` +
                      `Fin: ${endMonth}/${endYear}\n` +
                      `Duración: ${info.data.duration} meses`);
            }
        }
    });

    // Tooltip al pasar el mouse
    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const info = getActivityInfo(x, y);
        canvas.style.cursor = info ? 'pointer' : 'default';
    });
}

// Dibujar el gráfico al cargar la página
window.addEventListener('load', function() {
    if (initCanvas()) {
        drawXeroxGantt();
        setupEventListeners();
        console.log('Gráfico Gantt de Xerox cargado correctamente');
    } else {
        console.error('Error al inicializar el canvas');
    }
});

// Redimensionar canvas si es necesario
window.addEventListener('resize', function() {
    // Opcional: ajustar el canvas según el tamaño de la ventana
    if (canvas && ctx) {
        drawXeroxGantt();
    }
});
