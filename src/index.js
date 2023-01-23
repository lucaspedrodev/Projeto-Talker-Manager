const express = require('express');
const fs = require('fs').promises;
const { talkersData, tokenGen, writeNewTalkerData, talkerDelete } = require('./utils/fsCustom');
const { emailValidation, passwordValidation, autoriza, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation } = require('./middlewares/validation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talker = await talkersData();
  if (talker) {
    return res.status(200).json(talker);
  } 
    return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talker = await talkersData();

  const findTalker = talker.find((e) => Number(e.id) === Number(id));

  if (findTalker) {
    return res.status(200).json(findTalker);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', emailValidation, passwordValidation, (_req, res) => {
  res.status(200).json({ token: tokenGen() });
});

app.post('/talker', autoriza, nameValidation, ageValidation,
talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const talkers = await talkersData();
  const newTalker = { id: talkers.length + 1, ...req.body };
  const writeTalker = await writeNewTalkerData(newTalker);

  res.status(201).json(writeTalker);
});

app.put('/talker/:id', 
autoriza,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await talkersData();

    const index = talkers.findIndex((element) => element.id === Number(id));
    talkers[index] = { id: Number(id), name, age, talk };
    await fs.writeFile('src/talker.json', JSON.stringify(talkers));
    res.status(200).json(talkers[index]);
  });

  app.delete('/talker/:id', autoriza, async (req, res) => {
    const { id } = req.params;
  
    const updateData = await talkerDelete(Number(id));
  
    console.log(updateData);
  
    return res.status(204).end();
  });

app.listen(PORT, () => {
  console.log('Online');
});