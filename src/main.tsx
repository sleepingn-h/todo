import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthErrorEventBus } from './context/AuthContext';
import FakeHttp from './service/fakeHttp';
import HttpClient from './service/http';
import TokenStorage from './service/token';
import AuthService from './service/auth';
import TodoService from './service/todos';

import App from './App';

import './index.css';

const fakeClient = new FakeHttp();
const baseURL = import.meta.env.VITE_SERVER_URL;
const httpClient = new HttpClient(baseURL);
const tokenStorage = new TokenStorage('token');
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(fakeClient, tokenStorage);
const todoService = new TodoService(fakeClient, tokenStorage);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App
      authService={authService}
      authErrorEventBus={authErrorEventBus}
      todoService={todoService}
    />
    <div id='portal' />
  </StrictMode>
);
