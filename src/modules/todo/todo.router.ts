import { Router } from 'express';
import { todoController } from './todo.controller';
import { validate } from '../../common/middleware/validate';
import { createTodoSchema, updateTodoSchema } from './todo.schema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management API
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created
 *
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
router.post('/', validate(createTodoSchema), (req, res) =>
    todoController.create(req, res)
);
router.get('/', (req, res) => todoController.getAll(req, res));

/**
 * @swagger
 * /todos/stats:
 *   get:
 *     summary: Get todo statistics
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Stats object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 completed:
 *                   type: number
 *                 pending:
 *                   type: number
 */
router.get('/stats', (req, res) => todoController.getStats(req, res));

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The todo
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *
 *   patch:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated todo
 */
router.get('/:id', (req, res) => todoController.getById(req, res));
router.patch('/:id', validate(updateTodoSchema), (req, res) =>
    todoController.update(req, res)
);
router.delete('/:id', (req, res) => todoController.delete(req, res));

export const todoRouter = router;
