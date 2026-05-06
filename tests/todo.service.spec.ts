import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { todoService } from '../src/modules/todo/todo.service';
import { todoRepository } from '../src/modules/todo/todo.model';

jest.mock('../src/modules/todo/todo.model', () => ({
    todoRepository: {
        create: jest.fn(),
        findAll: jest.fn(),
    }
}));

describe('TodoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a todo', async () => {
        const mockTodo = { id: '1', title: 'Test Todo', completed: false, createdAt: new Date() };
        (todoRepository.create as any).mockResolvedValue(mockTodo);

        const todo = await todoService.create({ title: 'Test Todo' });
        expect(todoRepository.create).toHaveBeenCalledWith({ title: 'Test Todo' });
        expect(todo.title).toBe('Test Todo');
        expect(todo.completed).toBe(false);
    });

    it('should find all todos', async () => {
        const mockTodos = [
            { id: '1', title: 'T1', completed: false, createdAt: new Date() },
            { id: '2', title: 'T2', completed: true, createdAt: new Date() }
        ];
        (todoRepository.findAll as any).mockResolvedValue(mockTodos);

        const todos = await todoService.findAll();
        expect(todoRepository.findAll).toHaveBeenCalled();
        expect(todos).toHaveLength(2);
    });
});
