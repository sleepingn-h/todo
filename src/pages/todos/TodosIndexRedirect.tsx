import { useLocation, useNavigate } from 'react-router-dom';
import useTodosQuery from '@/hooks/todo/useTodosQuery';
import { useEffect } from 'react';

const TodosIndexRedirect = () => {
  const { data = [], isLoading, isError } = useTodosQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading || isError) return;
    if (data.length === 0) return;
    const first = data[0];
    navigate(
      { pathname: `/todos/${first.id}`, search: location.search },
      {
        replace: true,
        state: { todo: first },
      }
    );
  }, [data, isLoading, isError, navigate, location.search]);

  return null;
};

export default TodosIndexRedirect;
