const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const candidateRoutes = require('./routes/candidate');
const utilRoutes = require('./routes/util');
const authRoutes = require('./routes/auth');

const app = express();

const port = process.env.PORT || 3000;

const getMongoDbUrl = (
  userName = 'sergejprovalinskij',
  password = 'qwerty597',
  databaseName = 'it-candidates-database'
) => `mongodb+srv://${userName}:${password}@cluster0.omwdai9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const MONGODB_URI = getMongoDbUrl();

app.use(bodyParser.json());

app.use(cors());

app.use(candidateRoutes);
app.use(utilRoutes);
app.use(authRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log('Connection failed!', err));


module.exports = app;
