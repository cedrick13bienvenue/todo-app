import { Request, Response } from 'express';
import { todoService } from './todo.service';
import { asyncHandler } from '../../common/utils/asyncHandler';

export class TodoController {
    create = asyncHandler(async (req: Request, res: Response) => {
        const todo = await todoService.create(req.body);
        res.status(201).json(todo);
    });

    getAll = asyncHandler(async (req: Request, res: Response) => {
        const todos = await todoService.findAll();
        res.status(200).json(todos);
    });

    getById = asyncHandler(async (req: Request, res: Response) => {
        const todo = await todoService.findById(req.params.id as string);
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    });

    update = asyncHandler(async (req: Request, res: Response) => {
        const updated = await todoService.update(req.params.id as string, req.body);
        if (!updated) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.status(200).json(updated);
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
        const success = await todoService.delete(req.params.id as string);
        if (!success) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.status(204).send();
    });

    getStats = asyncHandler(async (req: Request, res: Response) => {
        const stats = await todoService.getStats();
        res.status(200).json(stats);
    });
}

export const todoController = new TodoController();
