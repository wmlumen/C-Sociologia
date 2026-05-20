// ============================================
// SCRIPT DE CARGA DE CONFIGURACIÓN
// Lectura de Datos_Generales.txt y reemplazo de placeholders
// ============================================

// Objeto CONFIG global
let CONFIG = {};

async function cargarConfiguracion() {
    try {
        // Intentar cargar desde archivo externo
        const respuesta = await fetch('Datos_Generales.txt');
        
        if (!respuesta.ok) {
            console.log('No se pudo cargar Datos_Generales.txt, usando valores por defecto');
            throw new Error(`Error: ${respuesta.status}`);
        }
        
        const texto = await respuesta.text();
        CONFIG = parsearConfig(texto);
        
        console.log('CONFIG loaded from file:', CONFIG);
        
    } catch (error) {
        console.log('Usando configuración por defecto:', error.message);
        
        // Valores por defecto hardcodeados en el HTML
        CONFIG = {
            name_docente: 'Christhian Keim',
            cedula_docente: '1340130',
            cedula_prueba: '99',
            grupo: 'S026',
            materia: 'Sociologia',
            ano: '2026',
            fecha_examen: '19/05/2026',
            tiempo_limite: 60,
            intentos_maximos: 2,
            preguntas_seleccion_multiple: 15,
            preguntas_verdadero_falso: 15,
            puntaje_total: 30,
            puntaje_aprobacion: 60,
            link_google_forms: 'https://docs.google.com/forms/d/1vChM_H3-KlrlvSOJPKdSpv4W-80Uv-ObKQKGv99aQUw/viewform',
            link_asistencia: 'https://docs.google.com/spreadsheets/d/1mMd2UbVxCQqLz4IaMUX88CE-Ov6F4ndp1NjxE9m-pY4',
            link_respuestas: 'https://docs.google.com/spreadsheets/d/1isV0oyTbiSGAWB5DZuNUjU8R3fm8H6pnPxcp_eOHb5s'
        };
    }
    
    // Reemplazar placeholders en todo el documento
    reemplazarPlaceholders();
}

function parsearConfig(texto) {
    const lineas = texto.split('\n');
    const config = {};
    
    lineas.forEach(linea => {
        const trimmed = linea.trim();
        
        // Ignorar líneas vacías o comentarios
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }
        
        const igualIndex = trimmed.indexOf('=');
        if (igualIndex === -1) {
            return;
        }
        
        let clave = trimmed.substring(0, igualIndex).trim();
        const valor = trimmed.substring(igualIndex + 1).trim();
        
        // Reemplazar puntos por guiones bajos
        // tiempo.limite -> tiempo_limite
        clave = clave.replace(/\./g, '_');
        
        config[clave] = valor;
    });
    
    return config;
}

function reemplazarPlaceholders() {
    // Reemplazar en todo el body
    const body = document.body;
    
    // Función recursiva para buscar y reemplazar en todos los nodos
    function procesarNodo(nodo) {
        if (nodo.nodeType === Node.TEXT_NODE) {
            const texto = nodo.textContent;
            // Buscar patrones como ${CONFIG.grupo} o ${CONFIG.tiempo_limite}
            if (texto.includes('${CONFIG.')) {
                const nuevoTexto = texto.replace(/\$\{CONFIG\.([a-zA-Z_]+)\}/g, (match, clave) => {
                    // Intentar con guiones bajos primero
                    if (CONFIG[clave] !== undefined) {
                        return CONFIG[clave];
                    }
                    // Si no existe, dejar el placeholder original
                    return match;
                });
                nodo.textContent = nuevoTexto;
            }
        } else if (nodo.nodeType === Node.ELEMENT_NODE) {
            // Procesar atributos
            const atributos = ['placeholder', 'title', 'alt', 'value', 'href', 'src'];
            atributos.forEach(attr => {
                if (nodo.hasAttribute(attr)) {
                    const valor = nodo.getAttribute(attr);
                    if (valor && valor.includes('${CONFIG.')) {
                        const nuevoValor = valor.replace(/\$\{CONFIG\.([a-zA-Z_]+)\}/g, (match, clave) => {
                            return CONFIG[clave] !== undefined ? CONFIG[clave] : match;
                        });
                        nodo.setAttribute(attr, nuevoValor);
                    }
                }
            });
            
            // Procesar hijos recursivamente
            if (nodo.childNodes) {
                nodo.childNodes.forEach(procesarNodo);
            }
        }
    }
    
    // Procesar todo el body
    if (body) {
        procesarNodo(body);
    }
    
    // También procesar el título de la página
    if (document.title && document.title.includes('${CONFIG.')) {
        document.title = document.title.replace(/\$\{CONFIG\.([a-zA-Z_]+)\}/g, (match, clave) => {
            return CONFIG[clave] !== undefined ? CONFIG[clave] : match;
        });
    }
    
    console.log('Placeholders reemplazados correctamente');
}

// ============================================
// INICIALIZACIÓN - EJECUTAR INMEDIATAMENTE
// ============================================

// Ejecutar lo antes posible
(async function init() {
    await cargarConfiguracion();
})();

// También escuchar por si el DOM ya está listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    cargarConfiguracion();
}

document.addEventListener('DOMContentLoaded', function() {
    // Ya se ejecutó arriba, pero por seguridad ejecutamos de nuevo
    cargarConfiguracion().then(() => {
        console.log('Examen listo con configuración:', CONFIG);
    });
});

// ============================================
// MAPA DE CLAVES PARA REFERENCIA
// ============================================
// clave_en_archivo -> clave_en_JavaScript
// name.docente -> name_docente
// cedula.docente -> cedula_docente
// tiempo.limite -> tiempo_limite
// intentos.maximos -> intentos_maximos
// preguntas.seleccion.multiple -> preguntas_seleccion_multiple
// preguntas.verdadero.falso -> preguntas_verdadero_falso
// puntaje.total -> puntaje_total
// puntaje.aprobacion -> puntaje_aprobacion
// link.google.forms -> link_google_forms
// link.asistencia -> link_asistencia
// link.respuestas -> link_respuestas