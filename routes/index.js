#!/usr/bin/env node

import express from 'express';
import appController from '../controller/appController';

const router = express.Router();

router
  .get('/', appController.getIndex);

export default router;