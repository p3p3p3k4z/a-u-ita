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

    const newPromt = `
    Sigue este formato para responder:
    -Solo texto plano no agreges  caracteres especiales o emojis.
    -Escribe la interpretacion de cada parametro (NDVI, NBR, EVI) y su significado en conjunto.
    -Manten las respuestas breves y concisas.
    -Usa oraciones cortas y claras.
    -Evita tecnicismos o lenguaje complejo.
    -Usa un tono amigable y accesible.
    -No incluyas saludos ni despedidas.
    -No repitas información innecesaria.
    -Concéntrate en interpretar los datos de vegetación.
    -No agregues palabras en negritas, cursivas o subrayadas.
    
    -No incluyas referencias a fuentes o citas.
    -Escribelo en formato html para insertarlo directamente en un modal.
    -No agregues etiquetas <html>, <body> o <head>.
    -No agregues estilos CSS ni clases.
    -Agrega una lista de los principales polinizadores que se benefician de la vegetación en el estado.
    -No agregues etiquetas <ul> o <ol>, solo usa <li> para cada polinizador.
    -No agregues etiquetas <p> innecesarias, solo donde sea relevante.
    -Agrega un título al inicio usando la etiqueta <h2>.
    -Agrega un subtítulo antes de la lista de polinizadores usando la etiqueta <h3>.
    -Agrega una lista de principales floras nativas del estado que se benefician de la vegetación.
    -No agregues etiquetas <ul> o <ol>, solo usa <li> para cada flora.
    -Agrega un subtítulo antes de la lista de floras usando la etiqueta <h3>.
    Analiza esta tres parametros y dame en pocas polabras su interpretación (Son datos provenientes de un estado de mexico): ${prompt}`;
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
