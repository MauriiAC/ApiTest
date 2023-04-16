// ---------------------------------------------------------------
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

app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userToUpdate = data.find(user => user.id === userId);
  if (!userToUpdate) {
    return res.status(404).json({ message: `El usuario con id ${userId} no existe.` });
  }
  const updatedUser = { ...userToUpdate, ...req.body };
  data = data.map(user => (user.id === userId ? updatedUser : user));
  res.json({ message: `El usuario con id ${userId} ha sido actualizado.`, user: updatedUser });
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

// ---------------------------------------------------------------