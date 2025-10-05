const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el parámetro 'prompt' en el cuerpo de la solicitud." });
    }

    // Selecciona el modelo de Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

    const newPromt = `Analiza esta tres parametros y dame en pocas polabras su interpretación (Son datos provenientes de un estado de mexico): ${prompt}`;
    const result = await model.generateContent(newPromt);

    // Devuelve la respuesta generada
    res.json({
      answer: result.response.text(),
    });

  } catch (error) {
    console.error("Error en ruta /gemini:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});

module.exports = router;
