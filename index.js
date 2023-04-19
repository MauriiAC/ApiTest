const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

// Permitir solicitudes desde múltiples orígenes
app.use(cors({
  origin: ['http://localhost:3005', 'http://localhost:3000']
}));

app.options('*', cors());

app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({message: 'Hola Mundo!'});
})

app.get('/sum/:op1/:op2', (req, res) => {
  
  const {op1, op2} = req.params

  res.json({result: `${parseInt(op1) + parseInt(op2)}`});
})

app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

app.get('/users/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const user = data.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.post('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const newId = data.length + 1;
  const newUser = { id: newId, ...req.body};
  data.push(newUser);
  fs.writeFileSync('data.json', JSON.stringify(data));
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const userIndex = data.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex >= 0) {
    const updatedUser = { ...data[userIndex], ...req.body };
    data[userIndex] = updatedUser;
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.delete('/users/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const userIndex = data.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex >= 0) {
    const deletedUser = data.splice(userIndex, 1)[0];
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
