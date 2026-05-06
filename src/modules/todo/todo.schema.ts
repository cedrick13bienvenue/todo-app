import { z } from 'zod';

export const createTodoSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title cannot be empty. Title is required.'),
    }),
});

export const updateTodoSchema = z.object({
    body: z.object({
        title: z.string().min(1).optional(),
        completed: z.boolean().optional(),
    }),
});
