export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export type CreateTodoDTO = Pick<Todo, 'title'>;
export type UpdateTodoDTO = Partial<Pick<Todo, 'title' | 'completed'>>;
