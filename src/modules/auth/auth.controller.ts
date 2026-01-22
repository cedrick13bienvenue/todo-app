import { Request, Response } from 'express';
import { query } from '../../config/database';

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            // NOTE: In a real app, use bcrypt to compare passwords and JWT for tokens.
            // This is a simplified demo for CI/CD visualization.

            // Simple check (mocking a real user being in DB)
            // For this demo we just check if the database is reachable
            const dbCheck = await query('SELECT NOW()');

            if (username === 'admin' && password === 'admin') {
                res.status(200).json({
                    message: 'Login successful',
                    token: 'fake-jwt-token',
                    db_status: 'connected',
                    db_time: dbCheck.rows[0].now
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }
    }
}
