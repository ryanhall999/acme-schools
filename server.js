const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');

app.use('/dist', express.static('dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/daily-moods', (req, res, next) => {
  db.readMoods()
    .then(moods => res.send(moods))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
});
