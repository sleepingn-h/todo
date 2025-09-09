import type { TodoResponse, FetchTodo } from '@/types/todo';
import { IHttpClient } from '@/service/http';
import TokenStorage from '@/service/token';

type TodosData = { data: FetchTodo[] };
type TodoData = { data: FetchTodo };

export interface ITodoService {
  getTodos: () => Promise<FetchTodo[]>;
  getTodoById: (id: string) => Promise<FetchTodo>;
  createTodo: (todo: FetchTodo) => Promise<TodoResponse>;
  updateTodo: (todo: FetchTodo) => Promise<FetchTodo>;
  deleteTodo: (id: string) => Promise<void>;
}

export default class TodoService implements ITodoService {
  constructor(private http: IHttpClient, private tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getTodos(): Promise<FetchTodo[]> {
    const todo = await this.http.fetch<TodosData>('/todos', {
      method: 'GET',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });

    return todo.data ?? [];
  }

  async getTodoById(id: string): Promise<FetchTodo> {
    const todo = await this.http.fetch<TodoData>(`/todos/${id}`, {
      method: 'GET',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });

    return todo.data;
  }

  async createTodo(todo: FetchTodo): Promise<TodoResponse> {
    const { title, content, priority } = todo;

    return await this.http.fetch('/todos', {
      method: 'POST',
      body: JSON.stringify({ title, content, priority }),
      headers: {
        Authorization: this.tokenStorage.getToken() ?? '',
      },
    });
  }

  async updateTodo(todo: FetchTodo): Promise<FetchTodo> {
    console.log(todo);

    const { title, content, priority } = todo;

    return await this.http.fetch(`/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, priority }),
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return await this.http.fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.tokenStorage.getToken() as string,
      },
    });
  }
}
