const express = require('express');
const { talkersData } = require('./utils/fsCustom');

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

app.listen(PORT, () => {
  console.log('Online');
});