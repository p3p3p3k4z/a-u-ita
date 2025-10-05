

document.addEventListener('DOMContentLoaded', function() {
  const paths = document.querySelectorAll('.mexico-cifras__mapa path');
  const stateNameElement = document.getElementById('stateName');
  const ndviValue = document.getElementById('ndviValue');
  const nbrValue = document.getElementById('nbrValue');
  const eviValue = document.getElementById('eviValue');
  const vegetationStatus = document.getElementById('vegetationStatus');
  const stateModal = new bootstrap.Modal(document.getElementById('stateModal'));

  paths.forEach(path => {
    path.addEventListener('click', async function() {
      // Quitar clase activa
      paths.forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      // Obtener nombre e id
      const stateName = this.getAttribute('data-estado') || this.querySelector('title')?.textContent || 'Estado desconocido';
      const stateId = this.getAttribute('data-id');

      // Mostrar el nombre
      stateNameElement.textContent = stateName;

      // Mostrar modal inmediatamente (con “Cargando…”)
      ndviValue.textContent = nbrValue.textContent = eviValue.textContent = '--';
      vegetationStatus.textContent = 'Cargando datos...';
      vegetationStatus.className = 'alert alert-secondary';
      stateModal.show();

      // Esperar respuesta del backend
      const data = await getDatosVegetation(stateName);

      if (data) {
        // Mostrar valores
        console.log('Datos recibidos:', data[0]);
        console.log('Datos recibidos:', data[0].NDVI, data[0].NBR, data[0].EVI);
        console.log('Datos recibidos:', data[0]['NDVI'], data[0]['NBR'], data[0]['EVI']);

        ndviValue.textContent = data[0].NDVI?.toFixed(2) ?? '--';
        nbrValue.textContent = data[0].NBR?.toFixed(2) ?? '--';
        eviValue.textContent = data[0].EVI?.toFixed(2) ?? '--';

        // Determinar situación
        const mensaje = interpretarVegetacion(data[0].NDVI, data[0].NBR, data[0].EVI);
        vegetationStatus.textContent = mensaje.texto;
        vegetationStatus.className = `alert ${mensaje.clase}`;
      } else {
        vegetationStatus.textContent = 'No se pudieron obtener datos.';
        vegetationStatus.className = 'alert alert-danger';
      }
    });
  });
});

async function getDatosVegetation(state) {
  try {
    const response = await fetch(`http://localhost:3000/api/vegetation/${state}`);
    if (!response.ok) throw new Error('Error en la respuesta');
    const data = await response.json();
    console.log('Datos de vegetación:', data['data']);
    return data['data'];
  } catch (error) {
    console.error('Error al obtener datos de vegetación:', error);
    return null;
  }
}

/**
 * Analiza los valores NDVI, NBR y EVI y devuelve un mensaje descriptivo
 */
function interpretarVegetacion(ndvi, nbr, evi) {
  // Definir umbrales aproximados
  console.log('Interpretando valores:', { ndvi, nbr, evi });
  if (ndvi === undefined || nbr === undefined || evi === undefined) {
    return { texto: 'Datos insuficientes para interpretar.', clase: 'alert-warning' };
  }
  const ndviAlto = ndvi >= 0.6;
  const ndviBajo = ndvi < 0.2;
  const nbrAlto = nbr > 0.2;
  const nbrBajo = nbr < -0.1;
  const eviAlto = evi >= 0.5;
  const eviBajo = evi <= 0.2;

  // Caso 1: Crecimiento
  if (ndviAlto && nbrAlto) {
    return { texto: '🌿 Las plantas están en crecimiento.', clase: 'alert-success' };
  }
  // Caso 2: Enfermedad o estrés hídrico
  else if (ndviBajo && nbrBajo && !eviBajo) {
    return { texto: '⚠️ Posible enfermedad o estrés hídrico.', clase: 'alert-warning' };
  }
  // Caso 3: Envejecimiento
  else if (ndviBajo && nbrBajo && eviBajo) {
    return { texto: '🍂 Envejecimiento de las plantas.', clase: 'alert-secondary' };
  }
  // Caso 4: Floración
  else if (ndviAlto && eviAlto && nbrBajo) {
    return { texto: '🌸 Etapa de floración.', clase: 'alert-info' };
  }
  // Caso general
  else {
    return { texto: '🔍 Estado intermedio o no definido claramente.', clase: 'alert-light' };
  }
}
