#!/usr/bin/env node

import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

/* Load the environment config */
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT;

/* Middlewares */
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

export default app;