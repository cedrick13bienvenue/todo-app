import { TodoService } from '../src/modules/todo/todo.service';

describe('TodoService', () => {
    let todoService: TodoService;

    beforeEach(() => {
        todoService = new TodoService();
    });

    it('should create a todo', async () => {
        const todo = await todoService.create({ title: 'Test Todo' });
        expect(todo.id).toBeDefined();
        expect(todo.title).toBe('Test Todo');
        expect(todo.completed).toBe(false);
    });

    it('should find all todos', async () => {
        await todoService.create({ title: 'T1' });
        await todoService.create({ title: 'T2' });
        const todos = await todoService.findAll();
        expect(todos).toHaveLength(2);
    });
});
