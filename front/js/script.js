document.addEventListener('DOMContentLoaded', () => {
    const stateButtons = document.querySelectorAll('.region-btn');
    const modelViewer = document.getElementById('island-viewer');
    const designLegend = document.getElementById('design-legend');

    // ====================================================================================
    //  NUESTRA NUEVA "BASE DE DATOS" CON LA FICHA TÉCNICA COMPLETA
    // ====================================================================================
    const stateData = {
        "Oaxaca": {
            modelSrc: "modelos/isla_oaxaca.glb",
            infoCompleta: {
                titulo: "Propuesta Integral de Isla Polinizadora – Oaxaca",
                contexto: {
                    ubicacion: "Oaxaca, México",
                    climas: "Templado subhúmedo, tropical seco y húmedo.",
                    usosAgricolas: "Maíz, café, agave, frutales, hortalizas.",
                    reto: "Pérdida de polinizadores por deforestación, agroquímicos y cambio climático."
                },
                dosel: {
                    titulo: "Dosel (Canopy Layer – Árboles)",
                    beneficios: "Captura de carbono, restauración de suelos, refugio de fauna, soporte para otras plantas.",
                    especies: [
                        { nombre: "Tepehuaje", cientifico: "Lysiloma acapulcense", funcion: "Fijador de nitrógeno, sombra, floración para abejas." },
                        { nombre: "Mezquite", cientifico: "Prosopis spp.", funcion: "Resiliente a sequía, mejora suelo, néctar abundante." },
                        { nombre: "Guaje", cientifico: "Leucaena leucocephala", funcion: "Comestible, floración prolongada, buena para suelos degradados." },
                        { nombre: "Copal", cientifico: "Bursera spp.", funcion: "Aporta néctar, resina cultural, alimento para abejas." },
                        { nombre: "Guayabo", cientifico: "Psidium guajava", funcion: "Árbol frutal, flores polinizadas por abejas y murciélagos." },
                        { nombre: "Zapote negro", cientifico: "Diospyros digyna", funcion: "Árbol frutal, sombra, alimento y refugio." }
                    ]
                },
                sotobosque: {
                    titulo: "Sotobosque (Understory Layer – Arbustos y Herbáceas)",
                    beneficios: "Diversidad floral, control biológico de plagas, soporte para polinizadores especializados.",
                    especies: [
                        { nombre: "Salvia mexicana", cientifico: "", funcion: "Floración atractiva para colibríes y abejas." },
                        { nombre: "Dalia coccinea", cientifico: "Flor nacional de México", funcion: "Atracción visual, néctar abundante." },
                        { nombre: "Lantana camara", cientifico: "", funcion: "Floración prolongada, resistente a sequía." },
                        { nombre: "Flor de Mayo", cientifico: "Plumeria rubra", funcion: "Muy visitada por mariposas y colibríes." },
                        { nombre: "Bugambilia", cientifico: "Bougainvillea spectabilis", funcion: "Resistente, refugio para insectos, flores casi todo el año." }
                    ]
                },
                coberturaSuelo: {
                    titulo: "Cobertura del Suelo (Ground Cover)",
                    beneficios: "Protegen el suelo, retienen humedad, aumentan resiliencia a sequías.",
                    especies: [
                        { nombre: "Cempasúchil", cientifico: "Tagetes erecta", funcion: "Polinizadores + control natural de plagas (nematicida)." },
                        { nombre: "Cosmos sulphureus", cientifico: "", funcion: "Muy visitada por abejas y mariposas." },
                        { nombre: "Albahaca silvestre", cientifico: "Ocimum micranthum", funcion: "Aroma, néctar, repelente natural." },
                        { nombre: "Zinnia elegans", cientifico: "Flor silvestre mexicana", funcion: "Flor duradera, visitada por mariposas y abejas." }
                    ]
                },
                polinizadores: {
                    titulo: "Polinizadores Clave",
                    especies: [
                        { nombre: "Abeja melipona", cientifico: "Melipona beecheii", rol: "Abeja sin aguijón nativa, ideal para agricultura." },
                        { nombre: "Abeja europea", cientifico: "Apis mellifera", rol: "Polinizadora generalista." },
                        { nombre: "Mariposa monarca", cientifico: "Danaus plexippus", rol: "Migratoria, polinización de flores silvestres." },
                        { nombre: "Colibríes locales", cientifico: "Trochilidae spp.", rol: "Polinizadores de flores tubulares." }
                    ]
                },
                auxiliares: {
                    titulo: "Insectos Auxiliares",
                    especies: [
                        { nombre: "Mariquitas", cientifico: "Coccinellidae", funcion: "Control biológico de pulgones." },
                        { nombre: "Crisopas", cientifico: "Chrysopidae", funcion: "Depredadoras de plagas agrícolas." },
                        { nombre: "Escarabajos estercoleros", cientifico: "", funcion: "Reciclaje de nutrientes y mejora del suelo." }
                    ]
                },
                infraestructura: {
                    titulo: "Infraestructura Adicional",
                    elementos: [
                        "<strong>Hotel de insectos:</strong> Troncos perforados, cañas, barro.",
                        "<strong>Sistema de captación de agua:</strong> Canaletas y cisterna para mantener humedad.",
                        "<strong>Zona de compostaje:</strong> Uso de poda y residuos agrícolas."
                    ]
                }
            }
        },
        // Puedes copiar la estructura de "Oaxaca" para "Chiapas" y "Guerrero" y cambiar los datos.
        "Chiapas": {
        modelSrc: "modelos/isla_chiapas.glb",
        infoCompleta: {
            titulo: "Propuesta de Isla Polinizadora – Chiapas",
            contexto: {
                ubicacion: "Chiapas, México.",
                climas: "Tropical húmedo, templado húmedo, selva baja y alta.",
                usosAgricolas: "Café, cacao, plátano, maíz, caña de azúcar, frutales tropicales.",
                reto: "Deforestación, pérdida de polinizadores, agricultura intensiva."
            },
            dosel: {
                titulo: "Dosel (Canopy Layer – Árboles medianos y grandes)",
                beneficios: "Captura de carbono, restauración de suelos, refugio de fauna, soporte para otras plantas y polinizadores.",
                especies: [
                    { nombre: "Ceiba", cientifico: "Ceiba pentandra", funcion: "Árbol emblemático, sombra, refugio de fauna, flores para polinizadores grandes." },
                    { nombre: "Cacao", cientifico: "Theobroma cacao", funcion: "Floración constante, alimento para abejas y murciélagos polinizadores." },
                    { nombre: "Guayacán", cientifico: "Tabebuia spp.", funcion: "Floración vistosa, atracción de abejas y colibríes." },
                    { nombre: "Mango", cientifico: "Mangifera indica", funcion: "Árbol frutal, flores y frutos atractivos para fauna y polinizadores." },
                    { nombre: "Tzalam", cientifico: "Lysiloma latisiliquum", funcion: "Fijador de nitrógeno, sombra, nectarífero para abejas." }
                ]
            },
            sotobosque: {
                titulo: "Sotobosque (Understory Layer – Arbustos y herbáceas)",
                beneficios: "Diversidad floral, refugio para polinizadores especializados y mariposas, floración escalonada.",
                especies: [
                    { nombre: "Salvia chiapensis", cientifico: "", funcion: "Floración para colibríes y abejas locales." },
                    { nombre: "Ixora coccinea", cientifico: "Ixora roja", funcion: "Atracción de polinizadores, floración duradera." },
                    { nombre: "Hibiscus rosa-sinensis", cientifico: "", funcion: "Floración vistosa, néctar para abejas y colibríes." },
                    { nombre: "Heliconia spp.", cientifico: "", funcion: "Flores tubulares, importantes para colibríes." },
                    { nombre: "Achiote", cientifico: "Bixa orellana", funcion: "Floración prolongada, semillas útiles, atracción de insectos." }
                ]
            },
            coberturaSuelo: {
                titulo: "Cobertura del Suelo (Ground Cover – Hierbas y flores rastreras)",
                beneficios: "Protección del suelo, retención de humedad, microclima estable.",
                especies: [
                    { nombre: "Cempasúchil", cientifico: "Tagetes erecta", funcion: "Control natural de plagas, atracción de polinizadores." },
                    { nombre: "Girasol nativo", cientifico: "Helianthus annuus var. mexicanus", funcion: "Polen y néctar abundante, visitado por abejas." },
                    { nombre: "Verdolaga", cientifico: "Portulaca oleracea", funcion: "Comestible, floración para abejas pequeñas." },
                    { nombre: "Hierbabuena", cientifico: "Mentha spp.", funcion: "Atractiva para abejas, repelente natural de plagas." },
                    { nombre: "Zinnia elegans", cientifico: "Flor silvestre mexicana", funcion: "Flor duradera, polinizada por abejas y mariposas." }
                ]
            },
            polinizadores: {
                titulo: "Polinizadores Clave en Chiapas",
                especies: [
                    { nombre: "Abeja melipona", cientifico: "Melipona beecheii", rol: "Abeja sin aguijón nativa, polinizadora eficiente de cultivos tropicales." },
                    { nombre: "Abeja europea", cientifico: "Apis mellifera", rol: "Polinizadora generalista." },
                    { nombre: "Colibríes locales", cientifico: "Trochilidae spp.", rol: "Polinizadores de flores tubulares y heliconias." },
                    { nombre: "Mariposa morfo azul", cientifico: "Morpho peleides", rol: "Polinizador ocasional, indicador de salud del ecosistema." }
                ]
            },
            auxiliares: {
                titulo: "Insectos Auxiliares",
                especies: [
                    { nombre: "Mariquitas", cientifico: "Coccinellidae", funcion: "Control biológico de pulgones y áfidos." },
                    { nombre: "Crisopas", cientifico: "Chrysopidae", funcion: "Depredadoras de plagas agrícolas." },
                    { nombre: "Escarabajos estercoleros", cientifico: "", funcion: "Reciclaje de nutrientes y mejora del suelo." }
                ]
            },
            infraestructura: {
                titulo: "Infraestructura Adicional",
                elementos: [
                    "<strong>Hotel de insectos:</strong> Troncos perforados, cañas y barro.",
                    "<strong>Sistema de captación de agua:</strong> Canaletas y cisterna para humedad constante.",
                    "<strong>Zona de compostaje:</strong> Uso de poda y residuos agrícolas."
                ]
            }
        }
    },
        "Guerrero": {
        modelSrc: "modelos/isla_guerrero.glb",
        infoCompleta: {
            titulo: "Propuesta de Isla Polinizadora – Guerrero",
            contexto: {
                ubicacion: "Guerrero, México.",
                climas: "Selvas bajas caducifolias, bosques templados, manglares y matorrales espinosos.",
                usosAgricolas: "Maíz, agave, café, frutales tropicales y hortalizas.",
                reto: "Proteger biodiversidad, mejorar resiliencia a sequía y diversificar la agricultura."
            },
            dosel: {
                titulo: "Dosel (Árboles, Arbustos y Cactáceas Nativas)",
                beneficios: "Resiliencia a sequía, captura de carbono, flores y frutos para polinizadores adaptados.",
                especies: [
                    { nombre: "Calliandra hirsuta", cientifico: "Huaje o timbre", funcion: "Arbusto leñoso con flores vistosas que atraen colibríes y abejas." },
                    { nombre: "Bursera spp.", cientifico: "Palo mulato o copal", funcion: "Diversas especies presentes en la flora leñosa local, aportan néctar." },
                    { nombre: "Acanthocereus fosterianus", cientifico: "Tasajillo de Guerrero", funcion: "Cacto columnar con flores nocturnas para insectos y murciélagos." },
                    { nombre: "Opuntia fuliginosa", cientifico: "Nopal silvestre", funcion: "Flores amarillas y frutos para una amplia gama de polinizadores." }
                ]
            },
            sotobosque: {
                titulo: "Sotobosque (Arbustos y Herbáceas Locales)",
                beneficios: "Aportan nectarios, protegen la humedad del suelo y atraen polinizadores especializados.",
                especies: [
                    { nombre: "Especies de Malvaceae", cientifico: "Familia del hibisco", funcion: "Grupo de plantas con diversidad de flores atractivas para insectos." },
                    { nombre: "Bromeliáceas endémicas", cientifico: "Flora epífita y terrestre", funcion: "Reservorios de agua y néctar, crean microclimas húmedos." },
                    { nombre: "Arbustos florales locales", cientifico: "", funcion: "Selección de flora nativa con floración escalonada." }
                ]
            },
            coberturaSuelo: {
                titulo: "Cobertura del Suelo (Plantas Rastreras y Suculentas)",
                beneficios: "Excelente adaptación a la sequía, conservan la humedad y previenen la erosión.",
                especies: [
                    { nombre: "Plantas suculentas", cientifico: "", funcion: "Bajo consumo de agua y flores atractivas para insectos pequeños." },
                    { nombre: "Bromeliáceas terrestres", cientifico: "", funcion: "Cubren el suelo, conservan la humedad y ofrecen refugio." }
                ]
            },
            polinizadores: {
                titulo: "Polinizadores Clave en Guerrero",
                especies: [
                    { nombre: "Scaptotrigona hellwegeri", cientifico: "Abeja 'cucu de mamey'", rol: "Abeja sin aguijón nativa, clave para la meliponicultura local." },
                    { nombre: "Colibríes", cientifico: "Trochilidae spp.", rol: "Polinizadores esenciales para flores tubulares de la región." },
                    { nombre: "Abejas y otros insectos", cientifico: "", rol: "Asociados a la abundante flora leñosa y cactácea." }
                ]
            },
            auxiliares: {
                titulo: "Insectos Auxiliares",
                especies: [
                    { nombre: "Mariquitas, Crisopas, etc.", cientifico: "", funcion: "Presentes en ecosistemas saludables para el control biológico de plagas." }
                ]
            },
            infraestructura: {
                titulo: "Infraestructura Adicional Adaptada",
                elementos: [
                    "<strong>Hoteles de insectos:</strong> Construidos con madera nativa y adaptados a especies locales.",
                    "<strong>Captación de agua:</strong> Especialmente importante para la temporada seca de la región.",
                    "<strong>Compostaje:</strong> Con el residuo vegetal de la flora local adaptada a la sequía."
                ]
            }
        }
    }
};

    // Función que se ejecuta al hacer clic en un botón
    function updateDisplay(state) {
        const data = stateData[state];
        
        if (!data || !data.infoCompleta) {
            console.error(`No se encontraron datos completos para el estado: ${state}`);
            modelViewer.src = data ? data.modelSrc : "";
            designLegend.innerHTML = `<h3>Información no disponible</h3><p>Aún no se ha cargado la ficha técnica para ${state}.</p>`;
            return;
        }

        modelViewer.src = data.modelSrc;
        renderLegend(data.infoCompleta); // Enviamos toda la información a la leyenda

        stateButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.state === state);
        });
    }
    
    // ====================================================================================
    //  NUEVA FUNCIÓN PARA RENDERIZAR LA LEYENDA COMO FICHA TÉCNICA
    // ====================================================================================
    function renderLegend(data) {
        let html = `<h2>${data.titulo}</h2>`;

        // Sección de Contexto
        html += `<div class="legend-section">
                    <h4>Región y Contexto</h4>
                    <p><strong>Ubicación:</strong> ${data.contexto.ubicacion}</p>
                    <p><strong>Climas:</strong> ${data.contexto.climas}</p>
                    <p><strong>Cultivos comunes:</strong> ${data.contexto.usosAgricolas}</p>
                    <p><strong>Reto:</strong> ${data.contexto.reto}</p>
                 </div>`;
        
        // Función auxiliar para crear las tablas de flora
        const createFloraTable = (sectionData) => {
            let tableHtml = `<div class="legend-section">
                                <h4>${sectionData.titulo}</h4>
                                <table class="flora-table">
                                    <thead>
                                        <tr><th>Especie</th><th>Función Ecológica</th></tr>
                                    </thead>
                                    <tbody>`;
            sectionData.especies.forEach(e => {
                tableHtml += `<tr>
                                <td><strong>${e.nombre}</strong><br><em>${e.cientifico || ''}</em></td>
                                <td>${e.funcion}</td>
                              </tr>`;
            });
            tableHtml += `</tbody></table><p class="benefits-text"><strong>Beneficios:</strong> ${sectionData.beneficios}</p></div>`;
            return tableHtml;
        };

        html += createFloraTable(data.dosel);
        html += createFloraTable(data.sotobosque);
        html += createFloraTable(data.coberturaSuelo);

        // Sección de Polinizadores
        html += `<div class="legend-section"><h4>${data.polinizadores.titulo}</h4><ul>`;
        data.polinizadores.especies.forEach(p => {
            html += `<li><strong>${p.nombre}</strong> (<em>${p.cientifico}</em>): ${p.rol}</li>`;
        });
        html += `</ul></div>`;
        
        // Sección de Insectos Auxiliares
        html += `<div class="legend-section"><h4>${data.auxiliares.titulo}</h4><ul>`;
        data.auxiliares.especies.forEach(i => {
            html += `<li><strong>${i.nombre}</strong>: ${i.funcion}</li>`;
        });
        html += `</ul></div>`;

        // Sección de Infraestructura
        html += `<div class="legend-section"><h4>${data.infraestructura.titulo}</h4><ul>`;
        data.infraestructura.elementos.forEach(e => {
            html += `<li>${e}</li>`;
        });
        html += `</ul></div>`;

        designLegend.innerHTML = html;
    }
    
    stateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const state = button.dataset.state;
            updateDisplay(state);
        });
    });

    updateDisplay("Oaxaca");
});