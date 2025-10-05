const express = require('express');
const pythonService = require('../services/pythonService');
const router = express.Router();


router.get('/vegetation/:state', async (req, res) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const { state } = req.params;
        const { startDate = yesterday, endDate = today } = req.query;

        console.log(`🌿 Solicitando datos para: ${state} (${startDate} a ${endDate})`);
        
        const result = await pythonService.getVegetationData(state, startDate, endDate);
        
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
        console.error('❌ Error en ruta vegetation:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message,
            state: req.params.state
        });
    }
});

module.exports = router;