import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Layout from '@components/layout/Layout';
import HomePage from '@/pages';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import NotFound from '@/pages/not-found';
import TodoPage from '@/pages/todos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
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
