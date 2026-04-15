// Config
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import handlerError from './Shared/Infrastructure/Utils/Middlewares/HandlerError';

// Routers
import { UserRouter } from './Users/Infrastructure/Router';
import { TaskRouter } from './Tasks/Infrastructure/Router';

// CONSTS
const PREFIX = '/api/v1';

const app = express();

// Config
app.use(express.json());
app.use(
  cors({
    origin: 'https://secure-task-app.garibcatastrofe.com', // Tu frontend
    credentials: true, // Permitir envío de cookies
  }),
);
app.use(cookieParser());

// Routes
app.use(PREFIX, UserRouter);
app.use(PREFIX, TaskRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

// Middlewares
app.use(handlerError);

export { app };
