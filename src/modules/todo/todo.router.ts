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
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 *       500:
 *         description: Internal server error
 */
router.post('/', validate(createTodoSchema), (req, res, next) => todoController.create(req, res, next));
router.get('/', (req, res, next) => todoController.getAll(req, res, next));

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
router.get('/stats', (req, res, next) => todoController.getStats(req, res, next));

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
router.get('/:id', (req, res, next) => todoController.getById(req, res, next));
router.patch('/:id', validate(updateTodoSchema), (req, res, next) => todoController.update(req, res, next));
router.delete('/:id', (req, res, next) => todoController.delete(req, res, next));

export const todoRouter = router;
