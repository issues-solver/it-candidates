const express = require('express');

const app = express();

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
  // {
  //   id: '9',
  //   name: 'Neon',
  //   contacts: {
  //     linkedin: 'test'
  //   }
  // },
];

app.get((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/candidates', (req, res) => {
  return res.status(200).json({ candidates });
});

module.exports = app;
