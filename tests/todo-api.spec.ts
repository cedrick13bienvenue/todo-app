import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { app } from '../src/app';
import { pool } from '../src/config/db';

describe('Todo API Integration Tests', () => {
    beforeAll(async () => {
        // Ensure table is created
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await pool.query('DELETE FROM todos');
    });

    afterAll(async () => {
        await pool.end();
    });

    let createdTodoId: string;

    it('POST /todos - should create a new todo', async () => {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'Integration Test Todo' })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Integration Test Todo');
        expect(response.body.completed).toBe(false);

        createdTodoId = response.body.id;
    });

    it('GET /todos - should return all todos', async () => {
        const response = await request(app).get('/todos').expect(200);

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe('Integration Test Todo');
    });

    it('GET /todos/:id - should return specific todo', async () => {
        const response = await request(app)
            .get(`/todos/${createdTodoId}`)
            .expect(200);

        expect(response.body.id).toBe(createdTodoId);
    });

    it('PATCH /todos/:id - should update todo', async () => {
        const response = await request(app)
            .patch(`/todos/${createdTodoId}`)
            .send({ completed: true })
            .expect(200);

        expect(response.body.completed).toBe(true);
    });

    it('DELETE /todos/:id - should delete todo', async () => {
        await request(app).delete(`/todos/${createdTodoId}`).expect(204);

        await request(app).get(`/todos/${createdTodoId}`).expect(404);
    });
});
