import express from 'express';
import fs from 'fs';
import { hostname } from 'os';

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(express.json());

const trainersData = JSON.parse(fs.readFileSync('trainers.json'));

app.get('/trainers', (req, res) => {
  res.json(trainersData);
});

app.get('/trainers/:id', (req, res) => {
  console.log('Requested ID:', req.params.id);
  const trainer = trainersData.find(trainer => trainer.id === req.params.id);
  console.log('Found Trainer:', trainer);
  if (!trainer) {
    return res.status(404).json({ message: 'Trainer not found' });
  }
  res.json(trainer);
});

app.put('/trainers/:id', (req, res) => {
  const trainerId = req.params.id;
  const updatedInfo = req.body;

  const trainerIndex = trainersData.findIndex(trainer => trainer.id === trainerId);
  if (trainerIndex === -1) {
    return res.status(404).json({ message: 'Trainer not found' });
  }

  trainersData[trainerIndex] = { ...trainersData[trainerIndex], ...updatedInfo };
  
  res.json(trainersData[trainerIndex]);
});

app.post('/trainers', (req, res) => {
  const newTrainer = req.body;
  trainersData.push(newTrainer);
  fs.writeFileSync('trainers.json', JSON.stringify(trainersData, null, 2));
  res.status(201).json(newTrainer);
});

app.delete('/trainers/:id', (req, res) => {
  const trainerId = req.params.id;

  const trainerIndex = trainersData.findIndex(trainer => trainer.id === trainerId);
  if (trainerIndex === -1) {
    return res.status(404).json({ message: 'Trainer not found' });
  }

  trainersData.splice(trainerIndex, 1);
  
  res.status(204).send();
});

app.delete('/trainers', (req, res) => {
  fs.writeFileSync('trainers.json', '[]');
  res.status(204).send();
});

app.use('/home', express.static('public'));

app.listen(PORT,hostname, () => {
  console.log(`Server is listening on http://${HOSTNAME}:${PORT}`);
});
