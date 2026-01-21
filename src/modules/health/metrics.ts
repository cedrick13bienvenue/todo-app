import client from 'prom-client';

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'todo-app',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

export const metricsRegistry = register;
