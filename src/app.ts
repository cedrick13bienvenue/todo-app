import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { todoRouter } from './modules/todo/todo.router';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRouter);

// Health check (preview for later phases)
app.get('/', (req, res) => {
    res.send({ status: 'API is running' });
});

export { app };
