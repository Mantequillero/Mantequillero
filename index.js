const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Ruta principal que maneja la solicitud
app.get('/route', async (req, res) => {
  try {
    const { start, end } = req.query; // Parámetros: inicio y fin
    
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/cycling-regular`,
      {
        params: {
          api_key: '5b3ce3597851110001cf6248b947b1ce2772488abbac7a0392803aaf',
          start,
          end
        }
      }
    );
    
    // Devuelve la respuesta simplificada
    res.json({
      geometry: response.data.features[0].geometry.coordinates,
      distance: response.data.features[0].properties.segments[0].distance,
      duration: response.data.features[0].properties.segments[0].duration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
