#!/usr/bin/env node

import express from 'express';
import morgan from 'morgan';
import router from './routes';
import api from './routes/api';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join('.', 'public')));
app.use(morgan('combined'));
app.use('/', router)
app.use(express.json());
app.use('/api', api);

const startServer = (port) => {
  app.listen(port, () => {
    console.log('Server started on port: ', port);
  });
}

startServer(PORT);
