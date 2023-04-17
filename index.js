const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Permitir solicitudes desde múltiples orígenes
app.use(cors({
  origin: '*'
}));

// Configuración de opciones de cors pre-vuelo (preflight)
app.options('*', cors());

// Middleware para parsear el body de los requests
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
