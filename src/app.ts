import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { todoRouter } from './modules/todo/todo.router';
import { httpLogger } from './common/middleware/httpLogger';


const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());
app.use(httpLogger);

import { healthRouter } from './modules/health/health.router';
import { metricsRegistry } from './modules/health/metrics';

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

import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


export { app };
