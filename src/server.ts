import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

import { logger } from './common/utils/logger';
import { connectDB, pool } from './config/db';

let server: any;

connectDB().then(() => {
    server = app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
});

const gracefulShutdown = async () => {
    logger.info('Received kill signal, shutting down gracefully');
    if (server) {
        server.close(async () => {
            logger.info('Closed out remaining connections');
            await pool.end();
            logger.info('Closed database pool');
            process.exit(0);
        });
    } else {
        await pool.end();
        process.exit(0);
    }

    // Force close server after 10 secs
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown();
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown:', error);
    gracefulShutdown();
});
