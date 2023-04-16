const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Permitir solicitudes desde múltiples orígenes
app.use(cors({
  origin: ['http://localhost:3001', 'https://miapp2.com']
}));

// Configuración de opciones de cors pre-vuelo (preflight)
app.options('*', cors());

// Middleware para parsear el body de los requests
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({ message: 'Hola mundo!' });
});

app.get('/sum/:op1/:op2', (req, res) => {

  const {op1, op2} = req.params

  res.json({ result: `${parseInt(op1) + parseInt(op2)}` });
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
