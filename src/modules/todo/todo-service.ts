import {
    Todo,
    CreateTodoDTO,
    UpdateTodoDTO,
    todoRepository,
} from './todo-model';

export class TodoService {
    async create(data: CreateTodoDTO): Promise<Todo> {
        return todoRepository.create(data);
    }

    async findAll(): Promise<Todo[]> {
        return todoRepository.findAll();
    }

    async findById(id: string): Promise<Todo | undefined> {
        return todoRepository.findById(id);
    }

    async update(id: string, data: UpdateTodoDTO): Promise<Todo | null> {
        return todoRepository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return todoRepository.delete(id);
    }

    async getStats(): Promise<{
        total: number;
        completed: number;
        pending: number;
    }> {
        return todoRepository.getStats();
    }
}

export const todoService = new TodoService();
