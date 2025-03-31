interface ITokenStorage {
  saveToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
}

export default class TokenStorage implements ITokenStorage {
  constructor(private token: string) {}
  saveToken(token: string) {
    localStorage.setItem(this.token, token);
  }

  getToken() {
    return localStorage.getItem(this.token);
  }

  clearToken() {
    localStorage.clear();
  }
}
