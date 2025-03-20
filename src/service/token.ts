const TOKEN = 'token';

interface ITokenStorage {
  saveToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
}

export default class TokenStorage implements ITokenStorage {
  saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear();
  }
}
