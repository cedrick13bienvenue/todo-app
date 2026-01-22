import { Todo, CreateTodoDTO, UpdateTodoDTO } from './todo.model';
// Removed uuid import

import crypto from 'crypto';

export class TodoService {
    private todos: Todo[] = [];

    async create(data: CreateTodoDTO): Promise<Todo> {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: data.title,
            completed: false,
            createdAt: new Date(),
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    async findAll(): Promise<Todo[]> {
        return this.todos;
    }

    async findById(id: string): Promise<Todo | undefined> {
        return this.todos.find(t => t.id === id);
    }

    async update(id: string, data: UpdateTodoDTO): Promise<Todo | null> {
        const todoIndex = this.todos.findIndex(t => t.id === id);
        if (todoIndex === -1) return null;

        const updatedTodo = { ...this.todos[todoIndex], ...data };
        this.todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(t => t.id !== id);
        return this.todos.length !== initialLength;
    }

    async getStats(): Promise<{ total: number; completed: number; pending: number }> {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        return {
            total,
            completed,
            pending: total - completed
        };
    }
}

export const todoService = new TodoService();
