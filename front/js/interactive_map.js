document.addEventListener('DOMContentLoaded', function() {
    // Una vez que hayas pegado tus paths, este código agregará interactividad
    const paths = document.querySelectorAll('.mexico-cifras__mapa path');
    
    paths.forEach(path => {
        path.addEventListener('click', function() {
            // Remover clase active de todos los paths
            paths.forEach(p => p.classList.remove('active'));
            
            // Agregar clase active al path clickeado
            this.classList.add('active');
            
            // Obtener información del estado
            const stateName = this.getAttribute('data-estado') || this.querySelector('title').textContent;
            const stateId = this.getAttribute('data-id');
            
            // Mostrar información del estado seleccionado
            console.log("seleccionad",stateName,"id",stateId)
        });
    });
});