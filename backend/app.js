const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const popularSkills = ['ASP.NET', 'C', 'C#', 'C++', 'CSS', 'CoffeeScript', 'Crystal', 'DM', 'Dart', 'Docker', 'Elixir', 'EmberScript', 'Git', 'Go', 'GraphQL', 'Groovy', 'HTML', 'HTTP', 'JSON', 'Java', 'JavaScript', 'Kotlin', 'Linux', 'Nginx', 'Objective-C', 'PHP', 'Pascal', 'Perl', 'PowerShell', 'Python', 'Ruby', 'Rust', 'SQL', 'Scala', 'Shell', 'Svelte', 'Swift', 'Terra', 'TypeScript', 'Vue', 'WebAssembly', 'XML', 'YAML'];

const Candidate = require('./models/candidate');

const app = express();

const getMongoDbUrl = (
  userName = 'sergejprovalinskij',
  password = 'qwerty597',
  databaseName = 'it-candidates-database'
) => `mongodb+srv://${userName}:${password}@cluster0.omwdai9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const MONGODB_URI = getMongoDbUrl();

const candidates = [
  {
    id: '0',
    name: 'Hydrogen',
    contacts: {
      linkedin: 'test',
      email: 'tut@asd.by',
      other: 'telephone number: 572 072 053'
    }
  },
  {
    id: '1',
    name: 'Helium',
    contacts: {
      linkedin: 'test',
      telegram: '@mick_betch'
    }
  },
  {
    id: '2',
    name: 'Lithium',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '3',
    name: 'Beryllium',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '4',
    name: 'Boron',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '5',
    name: 'Carbon',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '6',
    name: 'Nitrogen',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '7',
    name: 'Oxygen',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '8',
    name: 'Fluorine',
    contacts: {
      linkedin: 'test'
    }
  },
  {
    id: '9',
    name: 'Neon',
    contacts: {
      linkedin: 'test'
    }
  },
];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/api/create-candidate', (req, res) => {
  const { name, contacts } = req.body;
  const candidate = new Candidate({
    name,
    contacts
  });
  candidate.save();
  res.status(201).json({
    message: 'Candidate created successfully'
  })
});

app.use('/api/candidates', (req, res) => {
  return res.status(200).json({ candidates });
});

app.get('/api/popular-skills', (req, res) => {
  return res.status(200).json(popularSkills);
})

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log('Connection failed!', err));


module.exports = app;
