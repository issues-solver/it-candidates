const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const popularSkills = ['ASP.NET', 'C', 'C#', 'C++', 'CSS', 'CoffeeScript', 'Crystal', 'DM', 'Dart', 'Docker', 'Elixir', 'EmberScript', 'Git', 'Go', 'GraphQL', 'Groovy', 'HTML', 'HTTP', 'JSON', 'Java', 'JavaScript', 'Kotlin', 'Linux', 'Nginx', 'Objective-C', 'PHP', 'Pascal', 'Perl', 'PowerShell', 'Python', 'Ruby', 'Rust', 'SQL', 'Scala', 'Shell', 'Svelte', 'Swift', 'Terra', 'TypeScript', 'Vue', 'WebAssembly', 'XML', 'YAML'];
// const skills = popularSkills.map((i) => ({value: i}));

const candidateRoutes = require('./routes/candidate');
const utilRoutes = require('./routes/util');
const authRoutes = require('./routes/auth');
const config = require('./config');
// const Skill = require('./models/skill');

const app = express();

const port = process.env.PORT || 3000;

const getMongoDbUrl = (
  userName = config.databaseUserName,
  password = config.databasePassword,
  databaseName = config.databaseName
) => `mongodb+srv://${userName}:${password}@cluster0.omwdai9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const MONGODB_URI = getMongoDbUrl();

app.use(bodyParser.json());

app.use(cors());

app.use(candidateRoutes);
app.use(utilRoutes);
app.use(authRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
      // Skill.insertMany(skills).then();
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log('Connection failed!', err));


module.exports = app;
