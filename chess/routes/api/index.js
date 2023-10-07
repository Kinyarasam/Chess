#!/usr/bin/env node

import express from 'express';
import AppController from '../../controller/appController';

const api = express.Router();

api
  .get('/stats', AppController.getStats)
  .get('/status', AppController.getStatus)

export default api;
