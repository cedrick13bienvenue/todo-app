import { Router } from 'express';
import { todoController } from './todo.controller';

const router = Router();

router.post('/', (req, res) => todoController.create(req, res));
router.get('/', (req, res) => todoController.getAll(req, res));
router.get('/:id', (req, res) => todoController.getById(req, res));
router.patch('/:id', (req, res) => todoController.update(req, res));
router.delete('/:id', (req, res) => todoController.delete(req, res));

export const todoRouter = router;
