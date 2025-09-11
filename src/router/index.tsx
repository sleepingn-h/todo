import TodosIndexRedirect from '@/pages/todos/TodosIndexRedirect';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import SignupPage from '@/pages/auth/signup';
import NotFoundPage from '@/pages/not-found';
import LoginPage from '@/pages/auth/login';
import TodoPage from '@/pages/todos';
import HomePage from '@/pages';

import ProtectedRoute from './ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to='/todos' replace />,
      },
      {
        path: 'todos',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <TodosIndexRedirect /> },
          {
            path: ':todoId',
            element: <TodoPage />,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },
    ],
  },
]);

export default router;
