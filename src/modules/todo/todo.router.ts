import { Router } from 'express';
import { todoController } from './todo.controller';
import { validate } from '../../common/middleware/validate';
import { createTodoSchema, updateTodoSchema } from './todo.schema';

const router = Router();

router.post('/', validate(createTodoSchema), (req, res) => todoController.create(req, res));
router.get('/', (req, res) => todoController.getAll(req, res));
router.get('/:id', (req, res) => todoController.getById(req, res));
router.patch('/:id', validate(updateTodoSchema), (req, res) => todoController.update(req, res));
router.delete('/:id', (req, res) => todoController.delete(req, res));

export const todoRouter = router;
