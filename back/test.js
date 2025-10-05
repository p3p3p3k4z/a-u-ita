import fetch from 'node-fetch';

async function testAPI() {
    try {
        console.log('🧪 Probando API...');
        
        const response = await fetch('http://localhost:3000/api/vegetation/Jalisco?startDate=2024-01-01&endDate=2024-01-15');
        const data = await response.json();
        
        console.log('✅ Respuesta de la API:');
        console.log(JSON.stringify(data, null, 2));
        
    } catch (error) {
        console.error('❌ Error probando API:', error);
    }
}

// Esperar 2 segundos para que el servidor arranque
setTimeout(testAPI, 2000);