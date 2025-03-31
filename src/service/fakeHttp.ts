import { nanoid } from 'nanoid';
import { FetchOptions, IHttpClient } from './http';

const STORAGE_KEY = 'todo-data';

export default class FakeHttp implements IHttpClient {
  constructor() {
    this.load();
  }

  private async load() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const res = await fetch('/mock/getTodosMockData.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch mock data');
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Error loading mock data:', error);
          return [];
        });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.todos));
    }
  }

  async fetch<T>(url: string, options: FetchOptions): Promise<T> {
    const match = url.match(/\/todos\/(.+)/);
    const id = match ? match[1] : '';

    return this.handleRequest<T>(options, id);
  }

  private handleRequest<T>(options: FetchOptions, id?: string): Promise<T> {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : [];

    const body = options.body ? JSON.parse(options.body) : null;

    switch (options.method) {
      case 'GET':
        if (id) {
          const item = data.find((t: { id: string }) => t.id === id);
          return Promise.resolve({ data: item } as T);
        }
        return Promise.resolve({ data } as T);

      case 'POST':
        if (options.headers) {
          data.push({
            ...body,
            id: nanoid(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return Promise.resolve({
            data: {
              ...body,
              id: nanoid(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          } as T);
        }
        return Promise.resolve(data);

      case 'PUT': {
        const index = data.findIndex((t: { id: string }) => t.id === id);
        if (index === -1) throw new Error(`Todo with id '${id}' not found`);
        data[index] = {
          ...data[index],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return Promise.resolve({ data: data[index] } as T);
      }

      case 'DELETE': {
        const filtered = data.filter((t: { id: string }) => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return Promise.resolve({ data: filtered } as T);
      }

      default:
        throw new Error('not valid method type');
    }
  }
}
