export type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: string | null;
  credentials?: RequestCredentials;
};

interface IHttpClient {
  fetch: <T>(url: string, options: FetchOptions) => Promise<T>;
}

export default class HttpClient implements IHttpClient {
  constructor(private baseURL?: string) {
    this.baseURL = baseURL;
  }

  async fetch<T>(url: string, options: FetchOptions): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    let data;
    try {
      if (options.method !== 'DELETE') {
        data = await res.json();
      }
    } catch (error) {
      console.error(error);
    }

    if (!res.ok) {
      if (res.status > 209 || res.status < 200) {
        const message = data && data.details ? data.details : 'Something is wrong';

        throw new Error(message);
      }
    }

    return data;
  }
}
