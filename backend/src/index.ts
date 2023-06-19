import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import candidateRoutes from './routes/candidate.js';
import utilRoutes from './routes/skill.js';
import authRoutes from './routes/auth.js';
import config from './config.js';

const index = express();

const port = process.env.PORT || 3000;

const getMongoDbUrl = (
  userName = config.databaseUserName,
  password = config.databasePassword,
  databaseName = config.databaseName
) => `mongodb+srv://${userName}:${password}@cluster0.omwdai9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const MONGODB_URI = getMongoDbUrl();

index.use(bodyParser.json());

index.use(cors());

index.use(candidateRoutes);
index.use(utilRoutes);
index.use(authRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
    index.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log('Connection failed!', err));
