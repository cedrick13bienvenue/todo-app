import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { todoRouter } from './modules/todo/todo.router';
import { httpLogger } from './common/middleware/httpLogger';
import { healthRouter } from './modules/health/health.router';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Routes
app.use('/todos', todoRouter);
app.use('/health', healthRouter);

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', metricsRegistry.contentType);
    res.send(await metricsRegistry.metrics());
});

app.get('/', (req, res) => {
    res.send({ status: 'API is running' });
});

export { app };
