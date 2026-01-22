import { Request, Response } from 'express';
import { todoService } from './todo.service';

export class TodoController {
    async create(req: Request, res: Response) {
        try {
            const todo = await todoService.create(req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const todos = await todoService.findAll();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const todo = await todoService.findById(req.params.id as string);
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.status(200).json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updated = await todoService.update(req.params.id as string, req.body);
            if (!updated) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const success = await todoService.delete(req.params.id as string);
            if (!success) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getStats(req: Request, res: Response) {
        try {
            const stats = await todoService.getStats();
            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export const todoController = new TodoController();
