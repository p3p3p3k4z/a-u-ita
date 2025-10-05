const express = require('express');
const cors = require('cors');
const vegetationRoutes = require('./routes/vegetation');
const gemeniRoutes = require('./routes/gemeni');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', vegetationRoutes);
//recibira un promp para enviar a gemeni
app.use('/api/gemeni', gemeniRoutes);
//localhost:3000/api/gemeni/ask
// Ruta de salud
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servicio de vegetación funcionando',
        timestamp: new Date().toISOString(),
        service: 'Node.js + Python Earth Engine'
    });
});

// Ruta de prueba simple
app.get('/test', (req, res) => {
    res.json({ 
        message: 'API funcionando correctamente',
        endpoints: {
            health: '/health',
            vegetation: '/api/vegetation/:state',
            example: '/api/vegetation/Jalisco?startDate=2024-01-01&endDate=2024-03-01'
        }
    });
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en puerto ${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/health`);
    console.log(` Test: http://localhost:${PORT}/test`);
    console.log(` Ejemplo API: http://localhost:${PORT}/api/vegetation/Jalisco`);
});