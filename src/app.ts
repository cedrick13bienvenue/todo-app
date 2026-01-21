import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { todoRouter } from './modules/todo/todo.router';
import { httpLogger } from './common/middleware/httpLogger';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);

import { healthRouter } from './modules/health/health.router';

// Routes
app.use('/todos', todoRouter);
app.use('/health', healthRouter);

app.get('/', (req, res) => {
    res.send({ status: 'API is running' });
});

export { app };
