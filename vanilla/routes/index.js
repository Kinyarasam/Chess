#!/usr/bin/env node

import express from 'express';
import appController from '../controller/appController';
import gameController from '../controller/gameController';

const router = express.Router();

router
  .get('/', appController.getIndex)
  .get('/new-game', gameController.displayBoard)

export default router;