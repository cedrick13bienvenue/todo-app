import { pool } from '../../config/db';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export type CreateTodoDTO = Pick<Todo, 'title'>;
export type UpdateTodoDTO = Partial<Pick<Todo, 'title' | 'completed'>>;

export class TodoRepository {
    async create(data: CreateTodoDTO): Promise<Todo> {
        const result = await pool.query(
            'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed, created_at as "createdAt"',
            [data.title]
        );
        return result.rows[0];
    }

    async findAll(): Promise<Todo[]> {
        const result = await pool.query(
            'SELECT id, title, completed, created_at as "createdAt" FROM todos ORDER BY created_at DESC'
        );
        return result.rows;
    }

    async findById(id: string): Promise<Todo | undefined> {
        const result = await pool.query(
            'SELECT id, title, completed, created_at as "createdAt" FROM todos WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    async update(id: string, data: UpdateTodoDTO): Promise<Todo | null> {
        let query = 'UPDATE todos SET ';
        const values: any[] = [];
        let index = 1;

        if (data.title !== undefined) {
            query += `title = $${index}, `;
            values.push(data.title);
            index++;
        }
        if (data.completed !== undefined) {
            query += `completed = $${index}, `;
            values.push(data.completed);
            index++;
        }

        if (values.length === 0) return (await this.findById(id)) || null;

        query = query.slice(0, -2); // remove trailing comma and space
        query += ` WHERE id = $${index} RETURNING id, title, completed, created_at as "createdAt"`;
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await pool.query('DELETE FROM todos WHERE id = $1', [
            id,
        ]);
        return (result.rowCount ?? 0) > 0;
    }

    async getStats(): Promise<{
        total: number;
        completed: number;
        pending: number;
    }> {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE completed = true) as completed,
                COUNT(*) FILTER (WHERE completed = false) as pending
            FROM todos
        `);
        return {
            total: parseInt(result.rows[0].total),
            completed: parseInt(result.rows[0].completed),
            pending: parseInt(result.rows[0].pending),
        };
    }
}

export const todoRepository = new TodoRepository();
