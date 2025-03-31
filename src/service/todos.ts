import type { FetchTodo } from '@/types/todo';
import TokenStorage from '@/service/token';
import { IHttpClient } from '@/service/http';

type TodosData = { data: FetchTodo[] };
type TodoData = { data: FetchTodo };

export interface ITodoService {
  fetchTodo: (todoId?: string) => Promise<FetchTodo[] | FetchTodo>;
  createTodo: (todoItem: FetchTodo) => Promise<void>;
  updateTodo: (todoItem: FetchTodo, todoId: string) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
}

export default class TodoService implements ITodoService {
  constructor(private http: IHttpClient, private tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async fetchTodo(todoId?: string): Promise<FetchTodo[] | FetchTodo> {
    return todoId ? this.getTodoById(todoId) : this.getTodos();
  }

  private async getTodos(): Promise<FetchTodo[]> {
    const todo = await this.http.fetch<TodosData>('/todos', {
      method: 'GET',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });

    return todo.data ?? [];
  }

  private async getTodoById(todoId: string): Promise<FetchTodo> {
    const todo = await this.http.fetch<TodoData>(`/todos/${todoId}`, {
      method: 'GET',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });

    return todo.data ?? {};
  }

  async createTodo(todoItem: FetchTodo): Promise<void> {
    const { title, content, priority } = todoItem;

    return await this.http.fetch('/todos', {
      method: 'POST',
      body: JSON.stringify({ title, content, priority }),
      headers: {
        Authorization: this.tokenStorage.getToken() ?? '',
      },
    });
  }

  async updateTodo(todoItem: FetchTodo, todoId: string): Promise<void> {
    const { title, content, priority } = todoItem;

    return await this.http.fetch(`/todos/${todoId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, priority }),
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });
  }

  async deleteTodo(todoId: string): Promise<void> {
    return await this.http.fetch(`/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });
  }
}
