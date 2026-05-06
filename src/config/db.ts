import { Pool } from 'pg';
import { logger } from '../common/utils/logger';

export const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'todo_db',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.info('Connected to PostgreSQL Database successfully');
    
    // Create the todos table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    client.release();
  } catch (error) {
    logger.error('Database connection error', error);
    process.exit(1);
  }
};
