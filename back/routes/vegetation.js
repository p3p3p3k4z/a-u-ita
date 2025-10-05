const express = require('express');
const pythonService = require('../services/pythonService');
const router = express.Router();


router.get('/vegetation/:state', async (req, res) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const twoDaysBefore = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        const { state } = req.params;
        const { startDate = twoDaysBefore, endDate = today } = req.query;
        // Ejemplos de fechas : 2023-11-01 2023-11-03


        console.log(` Solicitando datos para: ${state} (${startDate} a ${endDate})`);
        
        const result = await pythonService.getVegetationData(state, twoDaysBefore, today);
        
        if (result.error) {
            return res.status(500).json({ 
                error: result.error,
                state: state 
            });
        }

        res.json({
            success: true,
            state: result.state,
            data: result.data,
            summary: result.summary,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error(' Error en ruta vegetation:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message,
            state: req.params.state
        });
    }
});

module.exports = router;